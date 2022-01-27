const redis = require('redis');

const initRedis = async () => {
    const client = redis.createClient();

    client.on('error', (err) => console.log(err));

    await client.connect();

    return client;
}


module.exports = initRedis;