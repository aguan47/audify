const Joi = require('joi');

const createJournalSchema = Joi.object({
    title: Joi.string().min(1).max(50).required().label('Title'),
    caption: Joi.string().min(1).max(150).required().label('Caption'),
    color: Joi.string().max(10).required().label('Color')
});

const editJournalSchema = Joi.object({
    title: Joi.string().min(1).max(50).required().label('Title'),
    caption: Joi.string().min(1).max(150).required().label('Caption'),
    color: Joi.string().max(10).required().label('Color')
});

module.exports = {
    createJournalSchema,
    editJournalSchema
}