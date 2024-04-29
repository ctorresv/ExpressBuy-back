import Joi from 'joi'

export const createInvoice = Joi.object({
        payment_date: Joi.date().required(),
        payment_method: Joi.string().required()
                .min(4)
                .max(20)
                .message({
                        "string.min": "the method must be at least 4 characteres",
                        "string.max": "the method must not have more than 20 characters",
                        "string.required": "the method is required"
                }),
        date_shipment: Joi.date().optional(),
        total_price: Joi.number().required()
                .min(2)
                .max(12)
                .message({
                        "number.min": "the total price must be at least 2 characteres",
                        "number.max": "the total price must not have more than 12 characters",
                        "number.required": "the total price is required"
                }),
        items: Joi.array().optional(),
        pdf_file: Joi.string().optional(),
        n_order: Joi.number().optional()
})

