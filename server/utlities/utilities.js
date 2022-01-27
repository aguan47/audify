const initRedis = require('../redis/Redis.js');

const getAccessTokenFromHeader = authHeader => {
    const accessToken = authHeader && authHeader.split(" ")[1];
    return accessToken;
}

const saveToRedis = async (key, value) => {
    let redisClient = await initRedis();
    return await redisClient.SET(key, value);
}

const getKeyValueRedis = async key => {
    let redisClient = await initRedis();
    return await redisClient.GET(key);
} 

const deleteKeyRedis = async key => {
    let redisClient = await initRedis();
    return await redisClient.DEL(key);
}

module.exports = {
    getAccessTokenFromHeader,
    saveToRedis,
    getKeyValueRedis,
    deleteKeyRedis
}