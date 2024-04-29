import usersServices from '../../services/user.service.js'
import cartServices from '../../services/cart.service.js'

const signIn = async (req, res, next) => {
  try {
    const response = await usersServices.sign_in(req.body)
    const response_cart = await cartServices.getme_cart(response.user._id)
    return res.status(response.status_code).json({
      success: response.success,
      message: response.message,
      token: response.token.token,
      user: response.user,
      cart: response_cart.cart
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

export default signIn
