import Joi from 'joi'

export const createUser = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required()
    .min(8)
    .messages({
      "string.min": "The password must have at least 8 characteres",
      'string.empty': 'The email cannot be empty',
      'any.required': 'A email is required',
    }),
  name: Joi.string().required()
    .min(3)
    .max(20)
    .messages({
      "string.min": "The name must have at least 3 characteres",
      "string.max": "The name must have a maximum of 20 characteres",
      'string.empty': 'The name cannot be empty',
      'any.required': 'A name is required',
    }),
  last_name: Joi.string().required()
    .min(3)
    .max(20)
    .messages({
      "string.min": "The last name must have at least 3 characteres",
      "string.max": "The last name must have a maximum of 20 characteres",
      'string.empty': 'The last_name cannot be empty',
      'any.required': 'A last_name is required',
    }),
  password: Joi.string().required()
    .min(8)
    .max(20)
    .messages({
      "string.min": "The password must have at least 8 characteres",
      "string.max": "The password must have a maximum of 20 characteres",
      'string.empty': 'The password cannot be empty',
      'any.required': 'A password is required',
    }),
  photo: Joi.string().uri().required()
    .min(8)
    .messages({
      "any.required": "A photo is required",
      "uri.required": "url required",
      'string.empty': 'The photo cannot be empty',
    })
})
export const userSignIn = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required()
    .min(8)
    .messages({
      "string.min": "The password must have at least 8 characteres",
      'string.empty': 'The email cannot be empty',
      'any.required': 'A email is required',
    }),
  password: Joi.string().required()
    .min(8)
    .max(20)
    .messages({
      "string.min": "The password must have at least 8 characteres",
      "string.max": "The password must have a maximum of 20 characteres",
      'string.empty': 'The password cannot be empty',
      'any.required': 'A password is required',
    })
})
