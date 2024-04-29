import SubCategory from '../models/SubCategory.js'

const subcategoryServices = {
    create: async function (body) {
        try {
            body.active=true
            let subcategory = await SubCategory.create(body)
            return {
                success: true,
                status_code: 201,
                subcategory
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'createsubcategory',
                    message: 'There was an error while creating the subcategory'
                }]
            }
        }
    },
    read: async function (body) {
        try {
            let subcategory = await SubCategory.find({active:true})
            return {
                success: true,
                status_code: 200,
                subcategory
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'readsubcategory',
                    message: 'There was an error while read the subcategory'
                }]
            }
        }
    },
    update: async function (subcategory_id, body) {
        try {
            let subcategoryUpdate = await SubCategory.findByIdAndUpdate(subcategory_id, body, { new: true })
            if (subcategoryUpdate) {
                return {
                    success: true,
                    status_code: 200,
                    subcategoryUpdate
                }
            } else {
                return {
                    success: false,
                    status_code: 404,
                    message: 'The subcategory has not been found with the data provided'
                }
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'subcategoryupdate',
                    message: 'There was an error while update the subcategory'
                }]
            }
        }
    },
    get_all_subcategories: async function () {
        try {
            let subcategories = await SubCategory.find()
            return {
                success: true,
                status_code: 200,
                subcategories
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'subcategoryall',
                    message: 'There was an error while read-all the subcategory'
                }]
            }
        }
    },
    delete_subcategory: async function (subcategory_id, body) {
        try {
            let subcategory = await SubCategory.findByIdAndDelete(subcategory_id, body)
            return {
                success: true,
                status_code: 200,
                subcategory
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'subcategoryall',
                    message: 'There was an error while delete the subcategory'
                }]
            }
        }

    },
    change_property: async function (subcategory_id) {
        try {
            let subcategory = await SubCategory.findById(subcategory_id)
            if (subcategory) {
                subcategory.active = !subcategory.active
                subcategory.save()
                return {
                    success: true,
                    status_code: 200,
                    subcategory
                }
            } else {
                return {
                    success: false,
                    status_code: 404,
                    message: 'The subcategory has not been found with the data provided'
                }
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'change',
                    message: 'There was an error while change property the subcategory'
                }]
            }
        }
    },
    subcategoryes_active_is_true: async function () {
        try {
            let subcategory = await SubCategory.find({ active: true })
            if (subcategory) {
                return {
                    success: true,
                    status_code: 200,
                    subcategory
                }
            } else {
                return {
                    success: false,
                    status_code: 404,
                    message: 'The subcategory has not been found with the data provided'
                }
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'subcategoryactive',
                    message: 'There are no subcategories with the property in active'
                }]
            }
        }
    },
    subcategories_name: async function (name) {
        try {
            let subcategory_name = await SubCategory.findOne({name})
            if (subcategory_name) {
                return {
                    success: true,
                    status_code: 200,
                    subcategory_name
                }
            } else {
                return {
                    succes: false,
                    status_code: 400,
                    message: 'No categories were found with the data provided.'
                }
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'subcategoryactive',
                    message: 'There are no subcategories with the property in active'
                }]
            }
        }
    }
}
export default subcategoryServices