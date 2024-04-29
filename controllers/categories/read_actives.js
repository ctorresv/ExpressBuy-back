import categoryServices from "../../services/category.service.js";

const read_actives = async (req, res, next) => {
    try {
        let response = await categoryServices.read_actives()
        return res.status(response.status_code).json({
            success: response.success,
            message: response.message,
            categories: response.all_actives
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: [{
                path: 'Internal',
                maessage: 'Internal Server error'
            }]
        })
    }
}

export default read_actives