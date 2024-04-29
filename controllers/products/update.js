import Product from '../../models/Product.js'
import productServices from '../../services/product.service.js'

const update = async (req, res, next) => {
  try {
    let response = await productServices.update(req.params.id, req.body)
    return res.status(response.status_code).json({
      success: response.success,
      product: response.product,
      message: response.message
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: [{
        path: 'internal',
        message: 'Internal server error'
      }]
    })
  }
}
export default update
