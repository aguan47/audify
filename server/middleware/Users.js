require('dotenv').config({path: `../.env.${process.env.NODE_ENV}`});
const { getAccessTokenFromHeader } = require('../utlities/utilities.js');
const jwt = require('jsonwebtoken');
const { getUserIdentifiersFromDB } = require('../db/models/Users.js');

const verifyToken = async(req, res, next) => {
    try {
        const accessToken = getAccessTokenFromHeader(req.headers['authorization']);

        if (!accessToken) throw new Error('No access token specified');

        const decodedInfo = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        let userInformation = await getUserIdentifiersFromDB(decodedInfo.id);
        userInformation = userInformation[0];

        res.locals.user = userInformation;
        next();
    } catch(err) {
        return res.status(401).json({ success: false, message: err.message });
    }
}

module.exports = {
    verifyToken
}