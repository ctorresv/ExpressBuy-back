import cartServices from "../../services/cart.service.js";

let create = async (req, res, next) => {
    try {
        let response = await cartServices.create(req.user.id)
        return res.status(response.status_code).json({
            success: response.success,
            message: response.message,
            cart: response.cart
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: [{
                path: 'internal',
                message: 'Internal server error'
            }]
        })
    }
}
export default create