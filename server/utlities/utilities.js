const getAccessTokenFromHeader = authHeader => {
    const accessToken = authHeader && authHeader.split(" ")[1];
    return accessToken;
}

module.exports = {
    getAccessTokenFromHeader
}