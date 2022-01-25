const validateRequest = async (schema, data) => {
    return await schema.validateAsync(data);
}

module.exports = {
    validateRequest
};