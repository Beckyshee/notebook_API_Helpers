import Joi from 'joi';

export const createNotesSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    createdAt: Joi.string().required(),
});
export const displayNotesSchema = Joi.object({
    id: Joi.string().uuid().required(),
    title: Joi.string().required(),
});
