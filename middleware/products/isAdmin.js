const isAdmin = async(req,res,next) => {
    if(req.user.role === 2) {
        return next()
        
    }
    return res.status(401).json({
        success: false,
        message: [{
            path: 'unauthorized',
            message: "You're not Authorized"
        }]
    })
}

export default isAdmin