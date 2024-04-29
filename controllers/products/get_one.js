import productServices from "../../services/product.service.js";


async function getOne(req, res, next) {
    try {
        let response = await productServices.get_one(req.params.id)
        return res.status(response.status_code).json({
            success: response.success,
            product: response.product,
            message: response.message
        })
    } catch (error) {
        return res.status(500).json({
            message: [{
                path: 'server',
                message: 'internal server error'
            }]
        })
    }
}

export default getOne