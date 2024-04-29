import departmentService from "../../services/department.service.js"

let update = async (req, res, next) => {
    try {
        let response = await departmentService.update(req.params.id, req.body)
        return res.status(response.status_code).json({
            success: response.succes,
            department: response.departmentUpdate
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: [{
                path: "internal",
                message: "Internal server error"
            }]
        })
    }
}
export default update