import productServices from "../../services/product.service.js"
import discountServices from "../../services/discount.service.js"


const create = async (req, res, next) => {
  try {
    const discount = await discountServices.create();
    req.body.discount_id = discount.discount._id
    const response = await productServices.create(req.body)
    return res.status(response.status_code).json({
      success: response.success,
      product: response.product,
      message: response.message
    })
  } catch (error) {
    return res.status(500).json({
      message: [{
        path: 'server',
        message: 'internal server error'
      }]
    })
  }
}
export default create
