import subcategoryServices from "../../services/subcategory.service.js"
const create = async (req, res, next) => {
  try {
    let response = await subcategoryServices.create(req.body)
    return res.status(response.status_code).json({
      succces: response.success,
      message: response.message,
      subcategory: response.subcategory
    })

  } catch (error) {
    return res.status(500).json({
      message: [{
        paht: 'server',
        message: 'Error internal the server'
      }]
    })
  }
}
export default create
