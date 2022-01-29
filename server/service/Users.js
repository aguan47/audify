require('dotenv').config({path: `../.env.${process.env.NODE_ENV}`});
const { validateRequest } = require('./validation.js');
const { newUserSchema, existingUserSchema, editUserSchema } = require('../db/schema/Users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { saveNewUserInformation, retrieveUserInfoByEmail, retrieveUserInformation, editUserInformation } = require('../db/models/Users.js');
const { saveToRedis, deleteKeyRedis } = require('../utlities/utilities.js');

const validateNewUser = async body => {
    return await validateRequest(newUserSchema, body);
}

const validateExistingUser = async body => {
    return await validateRequest(existingUserSchema, body);
}

const validateEditProfile = async body => {
    return await validateRequest(editUserSchema, body);
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
    if (userInfo.length === 0) throw new Error("User doesn't exists");
    
    const result = await bcrypt.compare(password, userInfo[0].password);
    if (!result) throw new Error("Wrong password");
    
    return userInfo[0];
}

const saveRefreshTokenToRedis = async (id, refreshToken) => {
    await saveToRedis(`${id}-refresh-token`, refreshToken);
}

const deleteRefreshTokensFromRedis = async key => {
    await deleteKeyRedis(key);
}

const getUserProfile = async id => {
    const data = await retrieveUserInformation(id); 
    if (data.length === 0) throw new Error("User doesn't exists");
    return data[0];
}

const editUserProfile = async (id, body) => {
    await editUserInformation(id, body);
}

module.exports = {
    validateNewUser,
    validateExistingUser,
    validateEditProfile,
    secureSaveNewUser,
    issueTokens,
    logInUser,
    saveRefreshTokenToRedis,
    deleteRefreshTokensFromRedis,
    getUserProfile,
    editUserProfile
};