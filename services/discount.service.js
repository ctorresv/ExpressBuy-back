import Discount from "../models/Discount.js"

const discountServices = {
    create: async function(){
        try {
            let discount = await Discount.create({
                active: false,
                percentage: 1
            })
            return {
                success: true,
                discount
            }
        } catch (error) {
            return {
                success: false,
                message: [{
                    path: "create",
                    message: "An error ocurred while creating discount"
                }]
            }
        }
        
    },
    delete: async function(id){
        await Discount.findOneAndDelete(id);
    }
}

export default discountServices