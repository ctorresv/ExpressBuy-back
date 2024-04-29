import subcategoryServices from "../../services/subcategory.service.js";

const getAllSubcategoryes = async (req, res, next) => {
    try {
        let response = await subcategoryServices.get_all_subcategories()
        return res.status(response.status_code).json({
            success: response.success,
            message: response.message,
            subcategories: response.subcategories
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: [{
                path: 'internal',
                message: 'Error internal the server'
            }]
        })
    }
}
export default getAllSubcategoryes
