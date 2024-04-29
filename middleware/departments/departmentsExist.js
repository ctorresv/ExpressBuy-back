import departmentService from "../../services/department.service.js";

let deparmentsExist = async (req, res, next) => {
    try {
        let response = await departmentService.department_exist(req.body.name)
        if (response.department) {
            return res.status(400).json({
                success: false,
                message: 'The Deparment is exists'
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: [{
                path: 'Error',
                message: 'Error internal server'
            }]
        })
    }
}
export default deparmentsExist