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

const register = async (req, res, next) => {
    try {
        await validateNewUserReqService(req.body);
        const { user_id } = await securelySaveNewUserService(req.body);
        const tokens = issueTokensService({name: req.body.name, email: req.body.email, id: user_id});
        await saveTokenToRedisService(user_id, tokens.refreshToken);
        return res.status(201).json({ success: true, message: "Successfully registed user", name: req.body.name, tokens });
    } catch(err) {
        err.status = 400;
        next(err);
    }
}

const login = async(req, res, next) => {
    try {
        await validateExistingUserReqService(req.body);
        const { email, name, user_id } = await logInUserService(req.body);
        const tokens = issueTokensService({name: name, email: email, id: user_id});
        await saveTokenToRedisService(user_id, tokens.refreshToken);
        return res.status(200).json({ success: true, message: "Successfully logged in", name: name, tokens });
    } catch(err) {
        err.status = 400;
        next(err);
    }
}

const validateAccessToken = (req, res, next) => {
    try {
        return res.status(200).json({success: true, message: 'Validated', user: res.locals.user});
    } catch(err) {
        err.status = 401;
        next(err);
    }
}

const logoutUser = async (req, res, next) => {
    try {
        const { user_id } = res.locals.user;
        await deleteRefreshTokensFromRedisService(`${user_id}-refresh-token`);
        return res.status(200).json({success: true, message: "Logged out"});
    } catch(err) {
        err.status = 401;
        next(err);
    }
}

const getUser = async (req, res, next) => {
    try {
        const { user_id } = res.locals.user;
        const user = await getUserDataService(user_id);
        return res.status(200).json({success: true, message: "Success", user});
    } catch (err) {
        err.status = 400;
        next(err);
    }
}

const getUserAvatar = async(req, res, next) => {
    try {
        const { user_id } = res.locals.user;
        const user = await getUserProfilePictureService(user_id);
        return res.status(200).json({success: true, message: "Success", user});
    } catch (err) {
        err.status = 400;
        next(err);
    }
}

const editUser = async (req, res, next) => {
    try {
        const { user_id } = res.locals.user;
        await validateEditUserReqService(req.body);
        await editUserDataService(user_id, req.body);
        return res.status(200).json({success: true, message: "Success"});
    } catch(err) {
        err.status = 400;
        next(err);
    }
}

const editProfilePicture = async(req, res, next) => {
    try {
        const { user_id } = res.locals.user;
        if (!req?.file?.filename) throw new Error('There is no file uploaded.')

        await editUserProfilePictureService(user_id, req?.file?.filename);
        return res.status(200).json({success: true, message: "Success"});
    } catch(err) {
        err.status = 400;
        next(err);
    }
}

const deleteProfile = async (req, res, next) => {
    try {
        const { user_id } = res.locals.user;
        await deleteUserProfileService(user_id);
        await deleteAllUserJournalsService(user_id);
        await deleteRefreshTokensFromRedisService(`${user_id}-refresh-token`);
        return res.status(200).json({success: true, message: "Success"});
    } catch(err) {  
        err.status = 400;
        next(err);
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