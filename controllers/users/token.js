import usersServices from '../../services/user.service.js'
import cartServices from '../../services/cart.service.js'

const token = async (req, res, next) => {
  try {
    const response = await usersServices.sign_in_token(req.user)
    const cart = await cartServices.getme_cart(req.user.id)
    return res.status(response.status_code).json({
      success: response.success,
      message: response.message,
      user: response.user,
      cart: cart.cart

    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: [{
        path: 'Error',
        message: 'Internal server error'
      }]
    })
  }
}

export default token
