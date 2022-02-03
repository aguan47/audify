const db = require('../knex.js');

const saveJournal = async(id, body, filename) => {
    const { title, caption, color } = body;
    
    return await db('journals')
    .returning(['journal_id', 'title', 'caption', 'journal_path', 'color', 'create_date'])
    .insert({
        user_id: id,
        title: title,
        color: color,
        caption: caption,
        journal_path: filename 
    });
}

const retrieveJournals = async(id) => {
    return await db('journals')
    .select('journal_id', 'title', 'caption', 'create_date', 'journal_path', 'color')
    .where('user_id','=', id);
}

module.exports = {
    saveJournal,
    retrieveJournals
};