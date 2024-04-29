import cartServices from "../../services/cart.service.js"

let addProducts = async (req, res, next) => {
    try {
        let response = await cartServices.add_product(req.params.id, req.body)
        return res.status(response.status_code).json({
            succes: response.success,
            message: response.message,
            cart: response.cart
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: [{
                path: 'internal',
                message: 'Internal server error'
            }]
        })
    }
}

export default addProducts