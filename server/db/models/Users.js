const db = require('../knex.js');

const saveNewUserInformation = async body => {
    const { name, birthday, password, email } = body;

    return await db('users')
    .returning('user_id')
    .insert({
        user_name: name,
        user_email: email, 
        birthday: birthday,
        password: password
    });
}

const retrieveUserInfoByEmail = async email => {
    return await db('users')
    .select('user_id', 'user_email', 'user_name', 'password')
    .where('user_email', '=', email);
}

const retrieveUserInfoById = async id => {
    return await db('users')
    .select('user_id', 'user_email', 'user_name')
    .where('user_id', '=', id);
}

module.exports = {
    saveNewUserInformation,
    retrieveUserInfoByEmail,
    retrieveUserInfoById
};