const db = require('../knex.js');

const saveNewJournalToDB = async(userID, body, filename) => {
    const { title, caption, color } = body;
    
    return await db('journals')
    .returning(['journal_id', 'title', 'caption', 'create_date', 'journal_path', 'color', 'is_edited', 'last_modified'])
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
    .select('journal_id', 'title', 'caption', 'create_date', 'journal_path', 'color', 'is_edited', 'last_modified')
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

const deleteOneJournalFromDB = async (userID, journalID) => {
    return await db('journals')
    .where({
        'user_id': userID,
        'is_deleted': 0,
        'journal_id': journalID
    })
    .update({
        'is_deleted': 1
    });
}

const editJournalToDB = async (userID, journalID, body, filename) => {
    const { title, caption, color } = body;
    const updateParameters = {
        title: title,
        caption: caption,
        color: color,
        is_edited: 1,
        last_modified: new Date()
    };

    if (filename) updateParameters.journal_path = filename;

    return await db('journals')
    .returning(['journal_id', 'title', 'caption', 'create_date', 'journal_path', 'color', 'is_edited', 'last_modified'])
    .where({
        'user_id': userID,
        'is_deleted': 0,
        'journal_id': journalID
    })
    .update(updateParameters);
}

module.exports = {
    saveNewJournalToDB,
    getUserJournalsFromDB,
    deleteAllUserJournalsFromDB,
    deleteOneJournalFromDB,
    editJournalToDB,

};