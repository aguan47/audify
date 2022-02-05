const db = require('../knex.js');

const saveUserInfoToDB = async body => {
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

const getUserByEmailInDB = async email => {
    return await db('users')
    .select('user_id', 'email', 'name', 'password')
    .where({
        'email': email,
        'is_deleted': 0
    });
}

const getUserIdentifiersFromDB = async id => {
    return await db('users')
    .select('user_id', 'email', 'name')
    .where({
        'user_id': id,
        'is_deleted': 0
    });
}

const getUserDataFromDB = async id => {
    return await db('users')
    .select('name', 'email', 'birthday', 'bio', 'join_date')
    .where({
        'user_id': id,
        'is_deleted': 0
    });
}

const getUserProfilePictureFromDB = async id => {
    return await db('users')
    .select('profile_picture_path')
    .where({
        'user_id': id,
        'is_deleted': 0
    });
}

const editUserDataToDB = async (id, body) => {
    const { name, birthday, email, bio } = body;

    return await db('users')
    .where({
        'user_id': id,
        'is_deleted': 0
    })
    .update({
        name: name,
        birthday: birthday,
        email: email,
        bio: bio
    });
}

const editUserPictureToDB = async(id, profilePicturePath) => {
    return await db('users')
    .where({
        'user_id': id,
        'is_deleted': 0
    })
    .update({
        profile_picture_path: profilePicturePath
    });
}

const deleteUserFromDB = async id => {
    return await db('users')
    .where({
        'user_id': id,
        'is_deleted': 0
    })
    .update({
        is_deleted: 1
    });
}

module.exports = {
    saveUserInfoToDB,
    getUserByEmailInDB,
    getUserIdentifiersFromDB,
    getUserDataFromDB,
    getUserProfilePictureFromDB,
    editUserDataToDB,
    editUserPictureToDB,
    deleteUserFromDB
};