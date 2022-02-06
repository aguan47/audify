const express = require('express');
const { verifyToken } = require('../../middleware/Users.js');
const router = express.Router();
const { audioUpload } = require('../../multer/multer.js');
const { createJournal, getJournals, deleteJournal } = require('../controllers/Journals.js');

router.get('/', verifyToken, getJournals);
router.post('/', verifyToken, audioUpload.single('journal'), createJournal);
router.delete('/:journalID', verifyToken, deleteJournal);


module.exports = router;