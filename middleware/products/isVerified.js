async function  is_verified(req,res,next) {
  
    if (req.user.is_verified) {
        return next()
    }
    return res.status(400).json({
        success: false,
        message: [
          {
            path: 'Verify',
            message: 'User not verify'
          }
        ]
      })
}

export default is_verified