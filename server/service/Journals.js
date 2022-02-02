const { saveJournal, retrieveJournals } = require("../db/models/Journals");
const { createJournalSchema } = require("../db/schema/Journals");
const { validateRequest } = require("./validation");

const validateNewJournal = async body => {
    return await validateRequest(createJournalSchema, body);
}

const createNewJournal = async(userId, body, filename) => {
    if (!filename) throw new Error("No journal recorded. Try again.");
    const data = await saveJournal(userId, body, filename);
    if (data.length === 0) throw new Error('Error saving journal. Try again');
    return data[0];
}

const getUserJournals = async(userId) => {
    return await retrieveJournals(userId);
}

module.exports = {
    createNewJournal,
    getUserJournals,
    validateNewJournal
};