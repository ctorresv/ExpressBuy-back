import Joi from 'joi'

export const createAddress = Joi.object({
    address_line: Joi.string()
        .required()
        .min(4)
        .max(20)
        .messages({
            'any.required': 'Is address is required',
            'string.empty': 'Is address is required',
            'string.min': 'The address is too short',
            'string.max': 'The address can only contain 20 letters'
        }),
    name: Joi.string().required()
        .min(4)
        .max(20)
        .message({
            'any.required': 'Is name is required',
            'string.empty': 'Is name is required',
            'string.min': 'The name is too short',
            'string.max': 'The name can only contain 20 letters'
        }),
    city: Joi.string().required()
        .min(4)
        .max(10)
        .message({
            'any.required': 'Is city is required',
            'string.empty': 'Is city is required',
            'string.min': 'The city is too short',
            'string.max': 'The city can only contain 10 letters'
        }),
    state: Joi.string().required()
        .min(4)
        .max(10)
        .message({
            'any.required': 'Is state is required',
            'string.empty': 'Is state is required',
            'string.min': 'The state is too short',
            'string.max': 'The state can only contain 10 letters'
        }),
    country: Joi.string().required()
        .min(4)
        .max(10)
        .message({
            'any.required': 'Is country is required',
            'string.empty': 'Is country is required',
            'string.min': 'The country is too short',
            'string.max': 'The country can only contain 10 letters'
        }),
    zip_code: Joi.number().required(),
    telephone: Joi.number().required()
})

export const updateAddress = Joi.object({
    address_line: Joi.string()
        .min(4)
        .max(20)
        .messages({
            'any.required': 'Is address is required',
            'string.empty': 'Is address is required',
            'string.min': 'The address is too short',
            'string.max': 'The address can only contain 20 letters'
        }),
    name: Joi.string()
        .min(4)
        .max(20)
        .message({
            'any.required': 'Is name is required',
            'string.empty': 'Is name is required',
            'string.min': 'The name is too short',
            'string.max': 'The name can only contain 20 letters'
        }),
    city: Joi.string()
        .min(4)
        .max(10)
        .message({
            'any.required': 'Is city is required',
            'string.empty': 'Is city is required',
            'string.min': 'The city is too short',
            'string.max': 'The city can only contain 10 letters'
        }),
    state: Joi.string()
        .min(4)
        .max(10)
        .message({
            'any.required': 'Is state is required',
            'string.empty': 'Is state is required',
            'string.min': 'The state is too short',
            'string.max': 'The state can only contain 10 letters'
        }),
    country: Joi.string()
        .min(4)
        .max(10)
        .message({
            'any.required': 'Is country is required',
            'string.empty': 'Is country is required',
            'string.min': 'The country is too short',
            'string.max': 'The country can only contain 10 letters'
        }),
    zip_code: Joi.number(),
    telephone: Joi.number()

})

