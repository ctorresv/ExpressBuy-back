import usersServices from "../../services/user.service.js"
import emailServices from "../../services/emails.service.js"
import cartServices from '../../services/cart.service.js'

const newUser = async (req, res, next) => {
  try {
    let response = await usersServices.sign_up(req.body)
    let sendEmail = emailServices.send_create_user(req.body, response.verify)
    let createcart = cartServices.create(response.sign_up._id)
    return res.status(response.status_code).json({
      success: response.success,
      message: response.message,
      user: response.sign_up,
      sendEmail: sendEmail
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

export default newUser
