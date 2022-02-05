const { validateNewUserReqService, 
    validateExistingUserReqService, 
    securelySaveNewUserService, 
    issueTokensService, 
    logInUserService, 
    saveTokenToRedisService, 
    deleteRefreshTokensFromRedisService, 
    getUserDataService, 
    editUserDataService, 
    validateEditUserReqService, 
    getUserProfilePictureService, 
    editUserProfilePictureService, 
    deleteUserProfileService} = require('../../service/Users.js');
const { deleteAllUserJournalsService } = require('../../service/Journals.js');

const register = async (req, res) => {
    try {
        await validateNewUserReqService(req.body);
        const { user_id } = await securelySaveNewUserService(req.body);
        const tokens = issueTokensService({name: req.body.name, email: req.body.email, id: user_id});
        await saveTokenToRedisService(user_id, tokens.refreshToken);
        res.status(201).json({ success: true, message: "Successfully registed user", name: req.body.name, tokens });
    } catch(err) {
        res.status(406).json({ success: false, message: err.message });
    }
}

const login = async(req, res) => {
    try {
        await validateExistingUserReqService(req.body);
        const { email, name, user_id } = await logInUserService(req.body);
        const tokens = issueTokensService({name: name, email: email, id: user_id});
        await saveTokenToRedisService(user_id, tokens.refreshToken);
        res.status(200).json({ success: true, message: "Successfully logged in", name: name, tokens });
    } catch(err) {
        res.status(406).json({ success: false, message: err.message });
    }
}

const validateAccessToken = (req, res) => {
    try {
        res.status(200).json({success: true, message: 'Validated', user: res.locals.user});
    } catch(err) {
        res.status(403).json({success: false, message: err.message});
    }
}

const logoutUser = async (req, res) => {
    try {
        const { user_id } = res.locals.user;
        await deleteRefreshTokensFromRedisService(`${user_id}-refresh-token`);
        res.status(200).json({success: true, message: "Logged out"});
    } catch(err) {
        res.status(403).json({success: false, message: err.message});
    }
}

const getUser = async (req, res) => {
    try {
        const { user_id } = res.locals.user;
        const user = await getUserDataService(user_id);
        res.status(200).json({success: true, message: "Success", user});
    } catch (err) {
        res.status(403).json({success: false, message: err.message});
    }
}

const getUserAvatar = async(req, res) => {
    try {
        const { user_id } = res.locals.user;
        const user = await getUserProfilePictureService(user_id);
        res.status(200).json({success: true, message: "Success", user});
    } catch (err) {
        res.status(403).json({success: false, message: err.message});
    }
}

const editUser = async (req, res) => {
    try {
        const { user_id } = res.locals.user;
        await validateEditUserReqService(req.body);
        await editUserDataService(user_id, req.body);
        res.status(200).json({success: true, message: "Success"});
    } catch(err) {
        res.status(403).json({success: false, message: err.message});
    }
}

const editProfilePicture = async(req, res) => {
    try {
        const { user_id } = res.locals.user;
        await editUserProfilePictureService(user_id, req?.file?.filename);
        res.status(200).json({success: true, message: "Success"});
    } catch(err) {
        res.status(403).json({success: false, message: err.message});
    }
}

const deleteProfile = async (req, res) => {
    try {
        const { user_id } = res.locals.user;
        await deleteUserProfileService(user_id);
        await deleteAllUserJournalsService(user_id);
        await deleteRefreshTokensFromRedisService(`${user_id}-refresh-token`);
        res.status(200).json({success: true, message: "Success"});
    } catch(err) {  
        res.status(400).json({success: false, message: err.message});
    }
}

module.exports = {
    register,
    login,
    validateAccessToken,
    logoutUser,
    getUser,
    getUserAvatar,
    editUser,
    editProfilePicture,
    deleteProfile
};