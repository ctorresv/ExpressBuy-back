import departmentService from "../../services/department.service.js";

let getAllDepartments = async (req, res, next) => {
    try {
        let response = await departmentService.departments_all()
        return res.status(response.status_code).json({
            success: response.success,
            message: response.message,
            departments: response.departments
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            messaage: [{
                path: 'internal',
                message: 'Error internall the server'
            }]
        })
    }
}
export default getAllDepartments