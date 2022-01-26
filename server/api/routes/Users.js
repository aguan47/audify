const express = require('express');
const { verifyToken } = require('../../middleware/Users.js');
const router = express.Router();
const { register, login, validateAccessToken } = require('../controllers/Users.js');


router.post('/register', register);
router.post('/login', login);
router.post('/validate_token', verifyToken, validateAccessToken);

module.exports = router;