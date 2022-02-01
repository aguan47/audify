const db = require('../knex.js');

const saveJournal = async(id, body, filename) => {
    const { title, caption } = body;
    
    return await db('journals')
    .returning('journal_id')
    .insert({
        user_id: id,
        title: title,
        caption: caption,
        journal_path: filename 
    });
}

module.exports = {
    saveJournal
};