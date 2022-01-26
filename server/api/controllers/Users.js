const { validateNewUser, validateExistingUser, secureSaveNewUser, issueTokens, logInUser } = require('../../service/Users.js');

const register = async (req, res) => {
    try {
        await validateNewUser(req.body);
        const { user_id } = await secureSaveNewUser(req.body);
        const tokens = issueTokens({name: req.body.name, email: req.body.email, id: user_id});
        res.status(201).json({ success: true, message: "Successfully registed user", name: req.body.name, tokens });
    } catch(err) {
        res.status(406).json({ success: false, message: err.message });
    }
}

const login = async(req, res) => {
    try {
        await validateExistingUser(req.body);
        const { user_email, user_name, user_id } = await logInUser(req.body);
        const tokens = issueTokens({name: user_name, email: user_email, id: user_id});
        res.status(200).json({ success: true, message: "Successfully logged in", name: user_name, tokens });
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

const logoutUser = (req, res) => {
    try {
        // TODO: remove the refresh token from the redis
        
        res.status(200).json({success: true, message: "Logged out"});
    } catch(err) {
        res.status(403).json({success: false, message: err.message});
    }
}


module.exports = {
    register,
    login,
    validateAccessToken,
    logoutUser
};