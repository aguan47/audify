const { createNewJournal } = require("../../service/Journals");

const createJournal = async(req, res) => {
    try {
        const { user_id } = res.locals.user;
        const data = await createNewJournal(user_id, req.body, req.file.filename);
        res.status(200).json({success: true, message: "Success", data});
    } catch(err) {
        res.status(403).json({success: false, message: err.message});
    }
}

module.exports = {
    createJournal
}