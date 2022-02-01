const multer = require('multer');
const multerOptions = destination => {
    return {
        destination: (req, file, cb) => {
            cb(null, destination);     // save it to the specified folder
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split("/")[1];
            const filename = `${new Date().getTime()}.${extension}`;
            cb(null, filename);
        }
    }
}


const imageStorage = multer.diskStorage(multerOptions('images/'));
const audioStorage = multer.diskStorage(multerOptions('audio/'));
const imageUpload = multer({storage: imageStorage});
const audioUpload = multer({storage: audioStorage});

module.exports = {
    imageUpload,
    audioUpload
};