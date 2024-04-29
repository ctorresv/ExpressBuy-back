import productServices from "../../services/product.service.js";

let allDiscount = async(req,res,next) =>{
    try {
        
        let response = await productServices.get_discounts()
        return res.status(response.status_code).json({
            success: response.success,
            message: response.message,
            products: response.products
        })
    } catch (error) {
        
    }
}

export default allDiscount