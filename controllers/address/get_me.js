import addressServices from "../../services/address.service.js";


const get_me = async (req, res) => {
  try {
    let response = await addressServices.get_me(req.user.id)
    return res.status(200).json({
      success: response.success,
      addresses: response.addressMe
    })
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: [{
        path: 'internal',
        message: 'Internal server error'
      }]
    })
  }
}
export default get_me