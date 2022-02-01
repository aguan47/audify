const db = require('../knex.js');
let path = require('path');

const saveNewUserInformation = async body => {
    const { name, birthday, password, email } = body;

    return await db('users')
    .returning('user_id')
    .insert({
        name: name,
        email: email, 
        birthday: birthday,
        password: password,
        profile_picture_path: "default-user.jpg"
    });
}

const retrieveUserInfoByEmail = async email => {
    return await db('users')
    .select('user_id', 'email', 'name', 'password')
    .where('email', '=', email);
}

const retrieveJSONPayload = async id => {
    return await db('users')
    .select('user_id', 'email', 'name')
    .where('user_id', '=', id);
}

const retrieveUserInformation = async id => {
    return await db('users')
    .select('name', 'email', 'birthday', 'bio', 'join_date')
    .where('user_id', '=', id);
}

const retrieveProfilePicture = async id => {
    return await db('users')
    .select('profile_picture_path')
    .where('user_id', '=', id);
}

const editUserInformation = async (id, body) => {
    const { name, birthday, email, bio } = body;

    return await db('users')
    .where('user_id', '=', id)
    .update({
        name: name,
        birthday: birthday,
        email: email,
        bio: bio
    });
}

const editUserProfilePicture = async(id, profilePicturePath) => {
    return await db('users')
    .where('user_id', '=', id)
    .update({
        profile_picture_path: profilePicturePath
    });
}

module.exports = {
    saveNewUserInformation,
    retrieveUserInfoByEmail,
    retrieveJSONPayload,
    retrieveUserInformation,
    retrieveProfilePicture,
    editUserInformation,
    editUserProfilePicture
};