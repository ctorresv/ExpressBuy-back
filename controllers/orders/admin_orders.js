import orderServices from "../../services/order.service.js";


async function getOrders(req, res, next) {
    try {
        let pagination = {
            limit: 10,
            page: 1
        }
        let filter = {}
        
        if (req.query.page) {
        pagination.page = req.query.page
    }
    if (req.query.status) {
        filter.status = req.query.status
    }
    let response = await orderServices.get_all(pagination, filter)
    return res.status(response.status_code).json({
        success: response.success,
        message: response.message,
        orders: response.orders,
        pagination: response.pagination
    })
} catch (error) {
    console.log(error)
    return res.status(500).json({
        success: false,
        message: [{
            path: "internal",
            message: "internal server error"
        }]
    })
}
}

export default getOrders