import categoryServices from "../../services/category.service.js";

let update = async(req,res,next) => {
    try {
        let response = await categoryServices.update(req.params.id, req.body)
        return res.status(response.status_code).json({
            success: response.success,
            message: response.message,
            category: response.updated_category
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: [{
                path: 'Internal',
                message: 'Internal Server error'
            }]
        })
    }
}

export default update
