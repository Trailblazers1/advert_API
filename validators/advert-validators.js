import Joi from "joi";

export const addAdvertValidator = Joi.object ({

    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    icon: Joi.string().required()
});

export const updateAdvertValidator = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    category: Joi.string(),
    icon: Joi.string()
});

   