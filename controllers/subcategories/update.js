import subcategoryServices from "../../services/subcategory.service.js"

const update = async (req, res, next) => {
  try {
    let response = await subcategoryServices.update(req.params.id, req.body)
    return res.status(response.status_code).json({
      success: response.success,
      message: response.message,
      subcategory: response.subcategoryUpdate
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: [{
        path: 'internal',
        message: 'Error internal the server'
      }]
    })
  }
}
export default update
