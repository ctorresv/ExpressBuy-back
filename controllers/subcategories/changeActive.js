import subcategoryServices from "../../services/subcategory.service.js";

let changeActive = async (req, res, next) => {
    try {
        let response = await subcategoryServices.change_property(req.params.id)
        return res.status(response.status_code).json({
            success: response.success,
            message: response.message,
            subcategory: response.subcategory
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
export default changeActive