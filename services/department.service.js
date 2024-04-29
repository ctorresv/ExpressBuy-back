import Department from '../models/Department.js'

const departmentService = {
    create: async function (body) {
        try {
            let department = await Department.create(body)
            return {
                success: true,
                status_code: 201,
                department
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'create',
                    message: 'There was an error while creating the department'
                }]
            }
        }

    },
    update: async function (department_id, body) {
        try {
            let departmentUpdate = await Department.findByIdAndUpdate(department_id, body, { new: true })
            return {
                succes: true,
                status_code: 200,
                departmentUpdate
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'update',
                    message: 'There was an error while update the departments'
                }]
            }
        }
    },
    departments_all: async function () {
        try {
            let departments = await Department.find()
            if (departments) {
                return {
                    success: true,
                    status_code: 200,
                    departments
                }
            } else {
                return {
                    success: false,
                    status_code: 404,
                    message: [{
                        path: 'departmentsall',
                        message: 'No department has been created yet'
                    }]
                }
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'departmentsall',
                    message: 'There was an error while read-all the departments'
                }]
            }
        }
    },
    department_exist: async function (name) {
        try {
            let department = await Department.findOne({name})
            if (department) {
                return {
                    success: true,
                    status_code: 200,
                    department
                }
            } else {
                return {
                    success: false,
                    status_code: 400,
                    message: 'The department does not exist'
                }
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'Error',
                    message: 'Error internal server'
                }]
            }
        }

    },
    department_active: async function (active) {
        try {
            let deparment = await Department.findByIdAndUpdate(id, { active: active }, { new: true })
            if (deparment) {
                await deparment.save()
                return {
                    success: true,
                    status_code: 200,
                    deparment
                }
            } else {
                return {
                    success: false,
                    status_code: 400,
                    message: 'No department were found with the data provided.'
                }
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'Error',
                    message: 'Error internal server'
                }]
            }
        }
    }

}
export default departmentService