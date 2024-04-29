import addressServices from "../../services/address.service.js"

const create = async (req, res, next) => {
    try {
        req.body.user_id = req.user.id
        let response = await addressServices.create(req.body)
        return res.status(response.status_code).json({
            success: response.success,
            address: response.address,
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