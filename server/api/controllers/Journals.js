const { createNewJournalService, 
    getUserJournalsService, 
    validateNewJournalReqService } = require("../../service/Journals");

const createJournal = async(req, res) => {
    try {
        const { user_id } = res.locals.user;
        await validateNewJournalReqService(req.body);
        const journal = await createNewJournalService(user_id, req.body, req.file.filename);
        res.status(200).json({success: true, message: "Success", journal});
    } catch(err) {
        res.status(403).json({success: false, message: err.message});
    }
}

const getJournals = async(req, res) => {
    try {
        const { user_id } = res.locals.user;
        const journals = await getUserJournalsService(user_id);
        res.status(200).json({success: true, message: "Success", journals});
    } catch(err) {  
        res.status(403).json({success: false, message: err.message});
    }
}

module.exports = {
    createJournal,
    getJournals
}