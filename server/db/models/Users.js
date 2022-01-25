const db = require('../knex.js');

const saveNewUserInformation = async body => {
    const { name, birthday, password, email } = body;

    return await db('users')
    .insert({
        user_name: name,
        user_email: email, 
        birthday: birthday,
        password: password
    });
}

const retrieveUserInformation = async email => {
    return await db('users')
    .select('user_email', 'user_name', 'password')
    .where('user_email', '=', email);
}

module.exports = {
    saveNewUserInformation,
    retrieveUserInformation
};