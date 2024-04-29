import addressServices from "../../services/address.service.js";

const update = async (req, res, next) => {
    req.body.user_id = req.user.id
    try {
        let response = await addressServices.update(req.params.id, req.body)
        return res.status(response.status_code).json({
            success: response.success,
            address: response.addressUpdate,
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
export default update