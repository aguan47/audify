const { validateNewUser, validateExistingUser, secureSaveNewUser, issueTokens, logInUser, saveRefreshTokenToRedis, deleteRefreshTokensFromRedis, getUserProfile, editUserProfile, validateEditProfile, getUserProfilePicture, editUserAvatar } = require('../../service/Users.js');

const register = async (req, res) => {
    try {
        await validateNewUser(req.body);
        const { user_id } = await secureSaveNewUser(req.body);
        const tokens = issueTokens({name: req.body.name, email: req.body.email, id: user_id});
        await saveRefreshTokenToRedis(user_id, tokens.refreshToken);
        res.status(201).json({ success: true, message: "Successfully registed user", name: req.body.name, tokens });
    } catch(err) {
        res.status(406).json({ success: false, message: err.message });
    }
}

const login = async(req, res) => {
    try {
        await validateExistingUser(req.body);
        const { email, name, user_id } = await logInUser(req.body);
        const tokens = issueTokens({name: name, email: email, id: user_id});
        await saveRefreshTokenToRedis(user_id, tokens.refreshToken);
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
        await deleteRefreshTokensFromRedis(`${user_id}-refresh-token`);
        res.status(200).json({success: true, message: "Logged out"});
    } catch(err) {
        res.status(403).json({success: false, message: err.message});
    }
}

const getUser = async (req, res) => {
    try {
        const { user_id } = res.locals.user;
        const user = await getUserProfile(user_id);
        res.status(200).json({success: true, message: "Success", user});
    } catch (err) {
        res.status(403).json({success: false, message: err.message});
    }
}

const getUserAvatar = async(req, res) => {
    try {
        const { user_id } = res.locals.user;
        const user = await getUserProfilePicture(user_id);
        res.status(200).json({success: true, message: "Success", user});
    } catch (err) {
        res.status(403).json({success: false, message: err.message});
    }
}

const editUser = async (req, res) => {
    try {
        const { user_id } = res.locals.user;
        await validateEditProfile(req.body);
        await editUserProfile(user_id, req.body);
        res.status(200).json({success: true, message: "Success"});
    } catch(err) {
        res.status(403).json({success: false, message: err.message});
    }
}

const editProfilePicture = async(req, res) => {
    try {
        const { user_id } = res.locals.user;
        await editUserAvatar(user_id, req?.file?.filename);
        res.status(200).json({success: true, message: "Success"});
    } catch(err) {
        res.status(403).json({success: false, message: err.message});
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
    editProfilePicture
};