const express = require('express');
const { verifyToken } = require('../../middleware/Users.js');
const router = express.Router();
const { audioUpload } = require('../../multer/multer.js');
const { createJournal } = require('../controllers/Journals.js');

router.post('/', verifyToken, audioUpload.single('journal'), createJournal);

module.exports = router;