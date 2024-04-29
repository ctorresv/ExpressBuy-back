import categoryServices from "../../services/category.service.js";

const read = async (req, res, next) => {
  try {
    let response = await categoryServices.read(req.body)
    return res.status(response.status_code).json({
      success: response.success,
      message: response.message,
      categories: response.all_categories
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: [{
        path: 'Internal',
        message: 'Internal Server error'
      }]
    })
  }
}

export default read