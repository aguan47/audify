const db = require('../knex.js');

const saveNewUserInformation = async body => {
    const { name, birthday, password, email } = body;

    return await db('users')
    .returning('user_id')
    .insert({
        name: name,
        email: email, 
        birthday: birthday,
        password: password
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

module.exports = {
    saveNewUserInformation,
    retrieveUserInfoByEmail,
    retrieveJSONPayload,
    retrieveUserInformation,
    editUserInformation
};