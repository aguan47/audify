const userSchema = require('../../db/schema/Users.js');
const { validateNewUser, validateExistingUser, secureSaveNewUser, issueTokens, logInUser } = require('../../service/Users.js');


const register = async (req, res) => {
    try {
        await validateNewUser(req.body);
        await secureSaveNewUser(req.body);
        const tokens = issueTokens({name: req.body.name, email: req.body.email});
        res.status(201).json({ success: true, message: "Successfully registed user", tokens });
    } catch(err) {
        res.status(406).json({ success: false, message: err.message });
    }
}

const login = async(req, res) => {
    try {
        await validateExistingUser(req.body);
        const { user_email, user_name } = await logInUser(req.body);
        const tokens = issueTokens({name: user_name, email: user_email});
        res.status(200).json({ success: true, message: "Successfully logged in", tokens });
    } catch(err) {
        res.status(406).json({ success: false, message: err.message });
    }
}

module.exports = {
    register,
    login
};