import usersServices from '../../services/user.service.js'

const signOut = async (req, res, next) => {
  try {
    let response = await usersServices.sign_out(req.user.email)
    return res.status(response.status_code).json({
      success: response.success,
      message: response.message,
      signout: response.signout
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

export default signOut
