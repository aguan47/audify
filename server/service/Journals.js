const { saveNewJournalToDB, getUserJournalsFromDB, deleteAllUserJournalsFromDB, deleteOneJournalFromDB } = require("../db/models/Journals");
const { createJournalSchema } = require("../db/schema/Journals");
const { validateRequest } = require("./validation");

const validateNewJournalReqService = async body => {
    return await validateRequest(createJournalSchema, body);
}

const createNewJournalService = async(userID, body, filename) => {
    if (!filename) throw new Error("No journal recorded. Try again.");
    const data = await saveNewJournalToDB(userID, body, filename);
    if (data.length === 0) throw new Error('Error saving journal. Try again');
    return data[0];
}

const getUserJournalsService = async(userID) => {
    return await getUserJournalsFromDB(userID);
}

const deleteAllUserJournalsService = async userID => {
    await deleteAllUserJournalsFromDB(userID);
}

const deleteOneJournalService = async(userID, journalID) => {
    await deleteOneJournalFromDB(userID, journalID);
}

module.exports = {
    createNewJournalService,
    getUserJournalsService,
    validateNewJournalReqService,
    deleteAllUserJournalsService,
    deleteOneJournalService
};