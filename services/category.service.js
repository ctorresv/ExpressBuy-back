import Category from "../models/Category.js";

const categoryServices = {
    create: async function (body) {
        try {
            let category = await Category.create(body)
            return {
                success: true,
                status_code: 201,
                category
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'create',
                    message: 'There was an error while creating the category'
                }]
            }
        }
    },
    read: async function () {
        try {
            let all_categories = await Category.find()

            return {
                success: true,
                status_code: 201,
                all_categories
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'get_all',
                    message: 'There was a error getting all categories'
                }]
            }
        }
    },
    read_actives: async function () {
        try {
            let all_actives = await Category.find({ active: true })
            return {
                success: true,
                status_code: 200,
                all_actives
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'read_actives',
                    message: 'There was an error getting all actives categories'
                }]
            }
        }
    },
    update: async function (id, body) {
        try {
            let updated_category = await Category.findByIdAndUpdate(id, body, { new: true })
            return {
                success: true,
                status_code: 201,
                updated_category
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'update',
                    message: 'There was an error trying update the category'
                }]
            }
        }
    },
    get_all_categories: async function () {
        try {
            let categories = await Category.find()
            return {
                success: true,
                status_code: 200,
                categories
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'categoryall',
                    message: 'There was an error while read-all the category'
                }]
            }
        }
    },
    categoryExists: async function (body) {
        try {
            const { name } = body
            const category = await Category.findOne({ name })
            return {
                success: true,
                status_code: 200,
                category
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'categoryexists',
                    message: 'There was an error while checking the category name'
                }]
            }

        }
    }
}

export default categoryServices