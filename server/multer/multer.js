const multer = require('multer');
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');     // save it to the images folder
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split(".")[1];
        const filename = `${new Date().getTime()}.${extension}`;
        cb(null, filename);
    }
});

const audioStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'audio/');     // save it to the audio folder
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split(".")[1];
        const filename = `${new Date().getTime()}.${extension}`;
        cb(null, filename);
    }
});

const imageUpload = multer({storage: imageStorage});
const audioUpload = multer({storage: audioStorage});

module.exports = {
    imageUpload,
    audioUpload
};