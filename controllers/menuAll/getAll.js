import departmentService from "../../services/department.service.js";
import categoryServices from "../../services/category.service.js";
import subcategoryServices from "../../services/subcategory.service.js";

let getAll = async (req, res, next) => {
    try {
        let department = await departmentService.departments_all()
        let category = await categoryServices.get_all_categories()
        let subcategory = await subcategoryServices.get_all_subcategories()
        return res.status(200).json({
            success: true,
            departments: department.departments,
            categories: category.categories,
            subcategories: subcategory.subcategories
        })
    } catch (error) {
        console.log(error)
    }
}
export default getAll