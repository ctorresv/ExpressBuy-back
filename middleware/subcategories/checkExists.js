import subcategoryServices from "../../services/subcategory.service.js";

const subcategoryExists = async (req, res, next) => {
    try {
        let response = await subcategoryServices.subcategories_name(req.body.name)
        if (response.subcategory_name) {
            return res.status(400).json({
                success: false,
                message: [{
                    path: "exist",
                    message: "the subcategory already exist"
                    }]
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: [{
                path: 'Error',
                message: 'Error internal server'
            }]
        })
    }
}
export default subcategoryExists