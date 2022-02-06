const { createNewJournalService, 
    getUserJournalsService, 
    validateNewJournalReqService } = require("../../service/Journals");


const createJournal = async(req, res, next) => {
    try {
        if (!req?.file?.filename) throw new Error('There is no file uploaded.')
        
        const { user_id } = res.locals.user;
        await validateNewJournalReqService(req.body);
        const journal = await createNewJournalService(user_id, req.body, req.file.filename);
        return res.status(200).json({success: true, message: "Success", journal});
    } catch(err) {
        err.status = 400;
        next(err);
    }
}

const getJournals = async(req, res, next) => {
    try {
        const { user_id } = res.locals.user;
        const journals = await getUserJournalsService(user_id);
        return res.status(200).json({success: true, message: "Success", journals});
    } catch(err) {  
        err.status = 400;
        next(err);
    }
}

const deleteJournal = async(req, res, next) => {
    try {
        const { user_id } = res.locals.user;
        const { journal_id } = req.body;
        return res.status(200).json({success: true, message: "Success"});
    } catch(err) {
        err.status = 400;
        next(err);
    }
}

module.exports = {
    createJournal,
    getJournals,
    deleteJournal
}