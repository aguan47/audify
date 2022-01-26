require('dotenv').config({path: `../.env.${process.env.NODE_ENV}`});
const { validateRequest } = require('./validation.js');
const { newUserSchema, existingUserSchema } = require('../db/schema/Users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { saveNewUserInformation, retrieveUserInfoByEmail } = require('../db/models/Users.js');

const validateNewUser = async body => {
    return await validateRequest(newUserSchema, body);
}

const validateExistingUser = async body => {
    return await validateRequest(existingUserSchema, body);
}

const secureSaveNewUser = async body => {
    const { password } = body;

    const saltedPassword = await bcrypt.hash(password, 10);
    const userInfo = await saveNewUserInformation({...body, password: saltedPassword});

    if (userInfo.length === 0) throw new Error('Error encountered when saving user information');
    return userInfo[0];
}

const issueTokens = payload => {
    // Payload is the name and email of the user
    // Tokens to be returned are the refresh and access tokens
    const oneDay = 60*60*24;
    const sixtyDays = oneDay*60;

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: oneDay });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: sixtyDays });

    return { accessToken, refreshToken, accessTokenLifespan: oneDay, refreshTokenLifespan: sixtyDays };
}

const logInUser = async body => {

    const { email, password } = body;

    const userInfo = await retrieveUserInfoByEmail(email);
    if (userInfo.length === 0) throw new Error('Error retrieving user information.');
    
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