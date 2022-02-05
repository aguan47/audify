require('dotenv').config({path: `../.env.${process.env.NODE_ENV}`});
const { validateRequest } = require('./validation.js');
const { newUserSchema, existingUserSchema, editUserSchema } = require('../db/schema/Users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { saveUserInfoToDB, 
    getUserByEmailInDB, 
    getUserDataFromDB, 
    editUserDataToDB, 
    getUserProfilePictureFromDB, 
    editUserPictureToDB, 
    deleteUserFromDB } = require('../db/models/Users.js');
const { saveToRedis, deleteKeyRedis } = require('../utlities/utilities.js');

const validateNewUserReqService = async body => {
    return await validateRequest(newUserSchema, body);
}

const validateExistingUserReqService = async body => {
    return await validateRequest(existingUserSchema, body);
}

const validateEditUserReqService = async body => {
    return await validateRequest(editUserSchema, body);
}

const securelySaveNewUserService = async body => {
    const { password } = body;

    const saltedPassword = await bcrypt.hash(password, 10);
    const userInfo = await saveUserInfoToDB({...body, password: saltedPassword});

    if (userInfo.length === 0) throw new Error('Error encountered when saving user information');
    return userInfo[0];
}

const issueTokensService = payload => {
    // Payload is the name and email of the user
    // Tokens to be returned are the refresh and access tokens
    const oneDay = 60*60*24;
    const sixtyDays = oneDay*60;

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: oneDay });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: sixtyDays });

    return { accessToken, refreshToken, accessTokenLifespan: oneDay, refreshTokenLifespan: sixtyDays };
}

const logInUserService = async body => {

    const { email, password } = body;

    const userInfo = await getUserByEmailInDB(email);
    if (userInfo.length === 0) throw new Error("User doesn't exists");
    
    const result = await bcrypt.compare(password, userInfo[0].password);
    if (!result) throw new Error("Wrong password");
    
    return userInfo[0];
}

const saveTokenToRedisService = async (id, refreshToken) => {
    await saveToRedis(`${id}-refresh-token`, refreshToken);
}

const deleteRefreshTokensFromRedisService = async key => {
    await deleteKeyRedis(key);
}

const getUserDataService = async id => {
    const data = await getUserDataFromDB(id); 
    if (data.length === 0) throw new Error("User doesn't exists");
    return data[0];
}

const getUserProfilePictureService = async id => {
    const data = await getUserProfilePictureFromDB(id);
    if (data.length === 0) throw new Error("User doesn't exists");
    return data[0];
}

const editUserDataService = async (id, body) => {
    await editUserDataToDB(id, body);
}

const editUserProfilePictureService = async(id, filename) => {
    if (!filename) throw new Error('Invalid image. Try again');
    await editUserPictureToDB(id, filename);
}

const deleteUserProfileService = async(id) => {
    await deleteUserFromDB(id);
}

module.exports = {
    validateNewUserReqService,
    validateExistingUserReqService,
    validateEditUserReqService,
    securelySaveNewUserService,
    issueTokensService,
    logInUserService,
    saveTokenToRedisService,
    deleteRefreshTokensFromRedisService,
    getUserDataService,
    getUserProfilePictureService,
    editUserDataService,
    editUserProfilePictureService,
    deleteUserProfileService
};