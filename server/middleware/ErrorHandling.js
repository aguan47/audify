const errorHandler = (error, req, res, next) => {
    console.log(error);
    switch(error.name) {
        case 'ValidationError':
            return res.status(error.status).json({success: false, message: error.message});
        case 'error':
            return res.status(error.status).json({success: false, message: "There was an error encountered. Try again."})
        default:
            return res.status(error.status).json({success: false, message: error.message});
    }
}

module.exports = {
    errorHandler
}