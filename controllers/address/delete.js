import addressServices from "../../services/address.service.js";

let deleteAddress = async (req, res, next) => {
    try {
        let response = await addressServices.delete(req.params.id, req.body)
        return res.status(200).json({
            success: response.success,
            message: response.message
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
export default deleteAddress