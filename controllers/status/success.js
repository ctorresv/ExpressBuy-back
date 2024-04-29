import stateService from "../../services/state.service.js"
import orderService from "../../services/order.service.js"


let success = async (req, res, next) => {
    try {
        let response = await stateService.state_create(req.body, req.params.id)
        if (response.success) {
            await orderService.paid(req.body.external_reference)
            return res.status(200).json({
                success: true, //esta es la respuesta del webhook hacia mercadopago
                success: response.state_webhook
            })
        } else {
            res.status(400).json({
                succes: false,
                message: 'Error in the response, check the request'
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: [{
                path: 'Error',
                message: 'Error internal server'
            }]
        })
    }
}
export default success