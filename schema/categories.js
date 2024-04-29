import Joi from "joi-oid"

export const createCategory = Joi.object({
    name: Joi
        .string()
        .required()
        .min(3)
        .max(20)
        .message({
            "string.min": "The name must have at least 3 characteres",
            "string.max": "The name must have a maximum of 20 characteres",
            'string.empty': 'The name cannot be empty',
            'any.required': 'The name is required'
        }),
    active: Joi.boolean().required(),
    department_id: Joi.objectId().required()
}
)

export const updateCategory = Joi.object({
    name: Joi
        .string()
        .min(3)
        .max(20)
        .message({
            "string.min": "The name must have at least 3 characteres",
            "string.max": "The name must have a maximum of 20 characteres",
            'string.empty': 'The name cannot be empty',
            'any.required': 'The name is required'
        }),
        active: Joi.boolean(),
        department_id: Joi.objectId()
})