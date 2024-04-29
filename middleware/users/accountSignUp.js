import User from '../../models/User.js'
import usersServices from '../../services/user.service.js'

async function accountExistsSignUp (req, res, next) {
  const user = await usersServices.acount_exist(req.body.email)
  if (user) {
    return res.status(400).json({
      success: false,
      message: [
        {
          path: 'exist',
          message: 'The user already exist'
        }
      ]
    })
  }
  return next()
}

export default accountExistsSignUp
