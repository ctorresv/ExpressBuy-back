import Joi from 'joi'

export const create_schema = Joi.object({
    name: Joi.string().required()
        .min(4)
        .max(60)
        .message({
            "string.min": "the name must be at least 4 characteres",
            "string.max": "the name must not have more than 30 characters",
            "string.required": "the lastname is required"
        }),
    photo: Joi.string().uri().required()
        .min(1)
        .message({
            "string.min": "the image must be at least 1 characteres",
        }),
    description: Joi.string().required()
        .min(3)
        .message({
            "string.min": "the description must be at least 3 characteres",
        }),
    price: Joi.number().required()
        .min(0.1)
        .message({
            "number.min": "the price must be at least 3 characteres"
        }),
    ean13: Joi.number().required()
        .min(5)
        .message({
            "number.min": "the ean13 must be at least 5 characteres"
        }),
    stock: Joi.number().required()
        .min(1)
        .message({
            "number.min": "the stock must be at least 1 characteres"
        }),
    department_id: Joi.string().required()
        .min(3)
        .message({
            "string.min": "the department must be at least 3 characteres",
        }),
    category_id: Joi.string().required()
        .min(3)
        .message({
            "string.min": "the category must be at least 3 characteres",
        }),
    subcategory_id: Joi.string().required()
        .min(3)
        .message({
            "string.min": "the subcategory must be at least 3 characteres",
        }),
})
export const update_schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(60)
        .message({
            "string.min": "the name must be at least 4 characteres",
            "string.max": "the name must not have more than 30 characters",
            "string.required": "the lastname is required"
        }),
    photo: Joi.string().uri()
        .min(1)
        .message({
            "string.min": "the image must be at least 1 characteres",
        }),
    description: Joi.string()
        .min(3)
        .message({
            "string.min": "the description must be at least 3 characteres",
        }),
    price: Joi.number()
        .min(0.1)
        .message({
            "number.min": "the price must be at least 3 characteres"
        }),
    ean13: Joi.number()
        .min(5)
        .message({
            "number.min": "the ean13 must be at least 5 characteres"
        }),
    stock: Joi.number()
        .min(1)
        .message({
            "number.min": "the stock must be at least 1 characteres"
        }),
    department_id: Joi.string()
        .min(3)
        .message({
            "string.min": "the department must be at least 3 characteres",
        }),
    category_id: Joi.string()
        .min(3)
        .message({
            "string.min": "the category must be at least 3 characteres",
        }),
    subcategory_id: Joi.string()
        .min(3)
        .message({
            "string.min": "the subcategory must be at least 3 characteres",
        }),
})
