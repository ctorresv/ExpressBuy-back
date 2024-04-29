import orderServices from "../../services/order.service.js"
import productServices from "../../services/product.service.js"

async function statusShipped(req, res, next){
    try {
        let response = await orderServices.shipped(req.params.id);
        let products_response = await productServices.substract_stock(response.order.products)
        if(products_response.success){
            return res.status(response.status_code).json({
                success: response.success,
                message: response.message,
                order: response.order
            })
        }else{
            return res.status(response.status_code).json({
                success: response.success,
                message: response.message,
                order: response.order,
                products_error: products_response.error
            })
        }
        
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

export default statusShipped