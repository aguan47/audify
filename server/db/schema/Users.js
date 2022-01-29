const Joi = require('joi');

const newUserSchema = Joi.object({
    name: Joi.string().required().label('Name'),
    birthday: Joi.date().required().label('Birthday'),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(8).max(16).required().label('Password')
});

const existingUserSchema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(8).max(16).required().label('Password')
});

const editUserSchema = Joi.object({
    name: Joi.string().required().label('Name'),
    birthday: Joi.date().required().label('Birthday'),
    email: Joi.string().email().required().label('Email'),
    bio: Joi.string().allow("").label('Biography')
});

module.exports = {
    newUserSchema,
    existingUserSchema,
    editUserSchema
};