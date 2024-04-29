import orderServices from '../../services/order.service.js'

async function myOrders(req, res, next) {
    try {
        let response = await orderServices.get_me(req.user.id)
        return res.status(response.status_code).json({
            success: response.success,
            orders: response.orders,
            message: response.message
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: [{
                path: "internal",
                message: "internal server error"
            }]
        })
    }
}

export default myOrders