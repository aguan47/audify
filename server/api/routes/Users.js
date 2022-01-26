const express = require('express');
const { verifyToken } = require('../../middleware/Users.js');
const router = express.Router();
const { register, login, validateAccessToken, logoutUser } = require('../controllers/Users.js');


router.post('/register', register);
router.post('/login', login);
router.post('/validate_token', verifyToken, validateAccessToken);
router.delete('/logout', verifyToken, logoutUser);

module.exports = router;