import cartServices from "../../services/cart.service.js";

const checkProducts = async(req, res,next)=>{
    try {
        let response = await cartServices.get_by_id(req.params.id)

        if(!response.cart.products.length > 0){

            return res.status(400).json({
                succcess: false,
                message: [{
                    path : "checkproducts",
                    message: "There is no products in the cart"
                }]
            })
        } next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: [{
                path: 'Error',
                message: 'Error internal server'
            }]
        })
    }
}

export default checkProducts
