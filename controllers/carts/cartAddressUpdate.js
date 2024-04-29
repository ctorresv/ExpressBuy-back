import cartServices from "../../services/cart.service.js";

let cartAddressUpdate = async (req, res, next) => {
    try {
        let response = await cartServices.update_address(req.params.id, req.body)
        return res.status(response.status_code).json({
            success: response.success,
            message: response.message,
            updateaddress: response.updateAddress
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: [{
                path: 'Error',
                message: 'Error internal the server'
            }]
        })
    }
}
export default cartAddressUpdate