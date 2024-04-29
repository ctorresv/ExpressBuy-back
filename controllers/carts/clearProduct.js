import cartServices from "../../services/cart.service.js"

let clearProduct = async (req, res, next) => {
    try {
        let response = await cartServices.clear_product(req.params.id, req.body)
        return res.status(response.status_code).json({
            success: response.success,
            message: response.message,
            clear: response.clear
        })
    } catch (error) {
        return {
            success: false,
            message: [{
                path: 'internal',
                message: 'Internal server error'
            }]
        }
    }
}
export default clearProduct