import cartServices from "../../services/cart.service.js";

let deleteProduct = async (req, res, next) => {
    try {
        let response = await cartServices.delete_product(req.params.id, req.body)
        return res.status(response.status_code).json({
            succes: response.success,
            message: response.message,
            product_delete: response.product_delete
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
export default deleteProduct