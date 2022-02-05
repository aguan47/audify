const express = require('express');
const { verifyToken } = require('../../middleware/Users.js');
const router = express.Router();
const { imageUpload } = require('../../multer/multer.js');
const { register, 
    login, 
    validateAccessToken, 
    logoutUser, 
    getUser, 
    editUser, 
    editProfilePicture, 
    getUserAvatar,
    deleteProfile } = require('../controllers/Users.js');

router.get("/", verifyToken, getUser);
router.get("/profile_picture", verifyToken, getUserAvatar);
router.post('/register', register);
router.post('/login', login);
router.post('/validate_token', verifyToken, validateAccessToken);
router.put('/profile_picture', verifyToken, imageUpload.single('profilePicture'), editProfilePicture);
router.put('/', verifyToken, editUser);
router.delete('/logout', verifyToken, logoutUser);
router.delete('/', verifyToken, deleteProfile);

module.exports = router;