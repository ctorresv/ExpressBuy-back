import subcategoryServices from "../../services/subcategory.service.js"

const read = async (req, res, next) => {
  try {
    let response = await subcategoryServices.read()
    return res.status(response.status_code).json({
      success: response.success,
      message: response.message,
      subcategories: response.subcategory
    })
  } catch (error) {
    return res.status(500).json({
      message: [{
        path: 'categories',
        message: "No existing Subcategories"
      }]
    })
  }
}
export default read
