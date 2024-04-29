import addressServices from '../../services/address.service.js'

let isProperty = async (req, res, next) => {
    try {
        let response = await addressServices.get_me(req.user.id)
        if (response.addressMe.some((item) => item._id.toString() === req.params.id)) {
            next()
        } else {
            return res.status(401).json({
                succes: false,
                message: [{
                    path: 'unauthorized',
                    message: 'You do not have permission for this action'
                }]
            })
        }
    } catch (error) {
        console.log(error)
    }
}
export default isProperty