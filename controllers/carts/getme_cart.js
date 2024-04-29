import cartServices from "../../services/cart.service.js";

let getmeCart = async (req, res, next) => {
    try {
        let response = await cartServices.getme_cart(req.user.id)
        return res.status(response.status_code).json({
            success: response.success,
            message: response.message,
            cart: response.cart
        })
    } catch (error) {
        return {
            succes: false,
            message: [{
                path: 'internal',
                message: 'Internal server error'
            }]
        }
    }
}
export default getmeCart