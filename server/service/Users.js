require('dotenv').config({path: `../.env.${process.env.NODE_ENV}`});
const { validateRequest } = require('./validation.js');
const { newUserSchema, existingUserSchema } = require('../db/schema/Users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { saveNewUserInformation, retrieveUserInformation } = require('../db/models/Users.js');

const validateNewUser = async body => {
    return await validateRequest(newUserSchema, body);
}

const validateExistingUser = async body => {
    return await validateRequest(existingUserSchema, body);
}

const secureSaveNewUser = async body => {
    const { password } = body;

    const saltedPassword = await bcrypt.hash(password, 10);
    return await saveNewUserInformation({...body, password: saltedPassword});
}

const issueTokens = payload => {
    // Payload is the name and email of the user
    // Tokens to be returned are the refresh and access tokens

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '60d' });

    return { accessToken, refreshToken };
}

const logInUser = async body => {

    const { email, password } = body;

    const userInfo = await retrieveUserInformation(email);
    const result = await bcrypt.compare(password, userInfo[0].password);

    if (!result) throw new Error("Wrong password");
    return userInfo[0];
}


module.exports = {
    validateNewUser,
    validateExistingUser,
    secureSaveNewUser,
    issueTokens,
    logInUser
};