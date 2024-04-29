import productServices from '../../services/product.service.js'
import discountServices from '../../services/discount.service.js'
const destroy = async (req, res, next) => {
  try {
    let response = await productServices.delete(req.params.id)
    if(response.success){
      await discountServices.delete(response.product.discount_id)
    }
    return res.status(response.status_code).json({
      success: response.success,
      product: response.product,
      message: response.message
    })
  } catch (error) {
    return res.status(500).json({
      message: [{
        path: 'server',
        message: 'Error internal the server'
      }]
    })
  }
}
export default destroy
