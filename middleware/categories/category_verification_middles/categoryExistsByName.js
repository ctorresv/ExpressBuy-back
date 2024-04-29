import categoryServices from "../../../services/category.service.js"



const categoryExistsByName = async (req, res, next) => {
    try {
        let response = await categoryServices.categoryExists(req.body)

        if (response.category) {
            return res.status(400).json({
                success: false,
                message: [{
                    path: 'categoryExists',
                    message: 'The category alredy exists'
                }]
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            path: 'Error',
            message: 'Error internal server'
        })
    }

}

export default categoryExistsByName