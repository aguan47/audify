const { saveNewJournalToDB, getUserJournalsFromDB, deleteAllUserJournalsFromDB } = require("../db/models/Journals");
const { createJournalSchema } = require("../db/schema/Journals");
const { validateRequest } = require("./validation");

const validateNewJournalReqService = async body => {
    return await validateRequest(createJournalSchema, body);
}

const createNewJournalService = async(userId, body, filename) => {
    if (!filename) throw new Error("No journal recorded. Try again.");
    const data = await saveNewJournalToDB(userId, body, filename);
    if (data.length === 0) throw new Error('Error saving journal. Try again');
    return data[0];
}

const getUserJournalsService = async(userId) => {
    return await getUserJournalsFromDB(userId);
}

const deleteAllUserJournalsService = async userId => {
    await deleteAllUserJournalsFromDB(userId);
}

module.exports = {
    createNewJournalService,
    getUserJournalsService,
    validateNewJournalReqService,
    deleteAllUserJournalsService
};