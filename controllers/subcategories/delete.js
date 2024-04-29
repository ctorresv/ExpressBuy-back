import subcategoryServices from "../../services/subcategory.service.js"

const destroy = async (req, res, next) => {
  try {
    let response = await subcategoryServices.delete_subcategory(req.params.id, req.body)
    return res.status(response.status_code).json({
      success: response.success,
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
export default destroy
