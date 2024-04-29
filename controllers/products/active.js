import productServices from "../../services/product.service.js";


async function active(req, res, next) {
    try {
        let response = await productServices.active(req.params.id)
        return res.status(response.status_code).json({
            success: response.success,
            product: response.product,
            message: response.message
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: [{
                path: "internal",
                message: "internal server error"
            }]
        })
    }
}

export default active