import Address from '../models/address.js'

const addressServices = {
    create: async function (body) {
        try {
            let address = await Address.create(body)
            return {
                success: true,
                status_code: 201,
                address
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'create',
                    message: 'There was an error while creating the address'
                }]
            }
        }
    },
    update: async function (id, body) {
        try {
            let addressUpdate = await Address.findByIdAndUpdate(id, body, { new: true })
            return {
                success: true,
                status_code: 200,
                addressUpdate
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'update',
                    message: 'There was an error while update the address'
                }]
            }
        }
    },
    get_me: async function (user_id) {
        try {
            let addressMe = await Address.find({ user_id: user_id })
            return {
                success: true,
                status_code: 200,
                addressMe
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'read',
                    message: 'There was an error while read the address'
                }]
            }
        }

    },
    delete: async function (id, body) {
        try {
            let addressDelete = await Address.findByIdAndDelete(id, body)
            return {
                success: true,
                status_code: 200,
                addressDelete
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'delete',
                    message: 'There was an error while delete the address'
                }]
            }
        }
    },
    adress_exist: async function (name, user_id) {
        try {
            let address = await Address.findOne({ name, user_id })
            return address

        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'read',
                    message: 'There was an error while read the address'
                }]
            }
        }
    }
}
export default addressServices