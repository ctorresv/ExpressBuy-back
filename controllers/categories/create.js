import categoryServices from "../../services/category.service.js";

const create = async(req,res,next) => {
  try {
    let response = await categoryServices.create(req.body)
    return res.status(response.status_code).json({
      success: response.success,
      message: response.message,
      category: response.category
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

export default create