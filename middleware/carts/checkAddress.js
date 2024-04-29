
import cartServices from "../../services/cart.service.js";

const checkAddress = async(req,res,next) => {
    try {
        let response = await cartServices.get_by_id(req.params.id)
        if(!response.cart.address_id){
            return res.status(400).json({
                success: false,
                message:[{
                    path: "checkaddress",
                    message: 'There is no address in the cart '
                }]
            } ) 
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

export default checkAddress