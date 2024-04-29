import departmentService from "../../services/department.service.js"

let create = async (req, res, next) => {
    try {
        let response = await departmentService.create(req.body)
        return res.status(response.status_code).json({
            succes: response.success,
            message: response.message,
            department: response.department
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