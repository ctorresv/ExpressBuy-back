import Category from "../../models/Category.js"


const destroy = async (req, res, next) => {
  try {
    const destroyCategory = await Category.findByIdAndDelete(req.params.id)
    if (destroyCategory) {
      return res.status(200).json({
        succes: true,
        message: 'Category Destroyed!',
        destroyCategory
      })
    } else {
      return res.status(404).json({
        success: false,
        message: [{
          path: 'categories',
          message: 'The category was not found with the provided data'
        }]
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: [{
        path: 'server',
        message: 'Error internal the server'
      }]
    })
  }s
}
export default destroy
