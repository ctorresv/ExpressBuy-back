import cartServices from "../../services/cart.service.js";
import orderServices from "../../services/order.service.js";
import invoiceServices from "../../services/invoice.service.js";
import emailServices from "../../services/emails.service.js"

let checkoutProduct = async (req, res, next) => {
    try {

        let { products_unpopulate, products_populate, address_id } = await cartServices.get_cart_order(req.user.id)
        let { order } = await orderServices.create(req.body, req.user.id, products_unpopulate, products_populate, address_id)
        let response = await cartServices.checkout(req.params.id)
        let invoice = await invoiceServices.create_invoice(order, req.user, products_populate)
        emailServices.send_invoice(req.user, invoice)

        return res.status(response.status_code).json({
            succes: response.success,
            message: response.message,
            order: order,
            cart: response.cart
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            succes: false,
            message: [{
                path: 'internal',
                message: 'Internal server error'
            }]
        })
    }
}
export default checkoutProduct