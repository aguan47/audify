const { saveJournal } = require("../db/models/Journals")

const createNewJournal = async(userId, body, filename) => {
    if (!filename) throw new Error("No journal recorded. Try again.");
    const data = await saveJournal(userId, body, filename);
    if (data.length === 0) throw new Error('Error saving journal. Try again');
    return data[0];
}

module.exports = {
    createNewJournal
};