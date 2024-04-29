import bcryptjs from 'bcryptjs'

function passwordIsOk (req, res, next) {
  const dbPass = req.user.password
  const formPass = req.body.password
  if (bcryptjs.compareSync(formPass, dbPass)) {
    return next()
  }
  return res.status(400).json({
    succes: false,
    message: [{
      path: 'credential',
      message: 'Wrong credentials'
    }]
  })
}

export default passwordIsOk
