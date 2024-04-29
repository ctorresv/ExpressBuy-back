import Department from "../../models/Department.js";

let read = async (req, res, next) => {
    try {
        let all_Department = await Department.find()
        // console.log(all_Department)
        return res.status(200).json({
            succes: true,
            all_Department
        })
    } catch (error) {
        next(error)
    }
}
export default read