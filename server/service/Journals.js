const { saveNewJournalToDB, getUserJournalsFromDB, deleteAllUserJournalsFromDB, deleteOneJournalFromDB, editJournalToDB } = require("../db/models/Journals");
const { createJournalSchema, editJournalSchema } = require("../db/schema/Journals");
const { validateRequest } = require("./validation");

const validateNewJournalReqService = async body => {
    return await validateRequest(createJournalSchema, body);
}

const validateEditJournalReqService = async body => {
    return await validateRequest(editJournalSchema, body);
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

const editJournalService = async(userID, journalID, body, filename) => {
    const data = await editJournalToDB(userID, journalID, body, filename);
    if (data.length === 0) throw new Error('Error editing journal. Try again');
    return data[0];
}

module.exports = {
    createNewJournalService,
    getUserJournalsService,
    validateNewJournalReqService,
    validateEditJournalReqService,
    deleteAllUserJournalsService,
    deleteOneJournalService,
    editJournalService
};