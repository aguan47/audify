const db = require('../knex.js');

const saveNewJournalToDB = async(userID, body, filename) => {
    const { title, caption, color } = body;
    
    return await db('journals')
    .returning(['journal_id', 'title', 'caption', 'journal_path', 'color', 'create_date'])
    .insert({
        user_id: userID,
        title: title,
        color: color,
        caption: caption,
        journal_path: filename 
    });
}

const getUserJournalsFromDB = async userID => {
    return await db('journals')
    .select('journal_id', 'title', 'caption', 'create_date', 'journal_path', 'color')
    .where({
        user_id: userID,
        is_deleted: 0
    });
}

const deleteAllUserJournalsFromDB = async userID => {
    return await db('journals')
    .where({
        'user_id': userID,
        'is_deleted': 0
    })
    .update({
        'is_deleted': 1
    });
}

module.exports = {
    saveNewJournalToDB,
    getUserJournalsFromDB,
    deleteAllUserJournalsFromDB
};