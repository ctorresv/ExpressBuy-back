import Order from "../models/Order.js";

const orderServices = {
    create: async function (body, user_id, products_unpopulate, products_populate, address_id) {
        try {
            body.address_id = address_id
            body.products = products_unpopulate
            body.user_id = user_id
            body.n_order = await this.get_last_order() + 1
            body.total_price = this.get_total_price(products_populate)
            let order = await Order.create(body)
            return {
                success: true,
                status_code: 201,
                order,
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'create',
                    message: 'There was an error while creating the order'
                }]
            }
        }
    },
    get_last_order: async function () {
        try {
            let order = await Order.find().sort({ n_order: -1 }).limit(1)

            if (order.length > 0) {
                return order[0].n_order
            }
            return 0
        } catch (error) {

        }
    },
    get_total_price: function (products) {
        let total_price = 0
        if (products.length > 0) {
            for (let product of products) {
                total_price += product.product_id.price * product.quantity
            }
        }
        return total_price
    },
    paid: async function (id) {
        try {
            let order = await Order.findByIdAndUpdate(id, { status: "paid" }, { new: true })
            order.payment_date = Date.now()
            order.save()
            if (order) {
                return {
                    success: true,
                    status_code: 200,
                    order
                }
            } else {
                return {
                    success: false,
                    status_code: 404,
                    message: [{
                        path: "notFound",
                        message: "the order doesn't exists"
                    }]
                }
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: "update",
                    message: "an error ocurred while updating the order"
                }]
            }
        }
    },
    shipped: async function (id) {
        try {
            let order = await Order.findByIdAndUpdate(id, { status: "shipped" }, { new: true })
            order.shipped_date = Date.now()
            order.save()
            if (order) {
                return {
                    success: true,
                    status_code: 200,
                    order
                }
            } else {
                return {
                    success: false,
                    status_code: 404,
                    message: [{
                        path: "notFound",
                        message: "the order doesn't exists"
                    }]
                }
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: "update",
                    message: "an error ocurred while updating the order"
                }]
            }
        }
    },
    delivered: async function (id) {
        try {
            let order = await Order.findByIdAndUpdate(id, { status: "delivered" }, { new: true })
            order.delivered_date = Date.now()
            order.save()
            if (order) {
                return {
                    success: true,
                    status_code: 200,
                    order
                }
            } else {
                return {
                    success: false,
                    status_code: 404,
                    message: [{
                        path: "notFound",
                        message: "the order doesn't exists"
                    }]
                }
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: "update",
                    message: "an error ocurred while updating the order"
                }]
            }
        }
    },
    cancel: async function (id) {
        try {
            let order = await Order.findByIdAndUpdate(id, { status: "cancel" }, { new: true })
            order.cancel_date = Date.now()
            order.save()
            if (order) {
                return {
                    success: true,
                    status_code: 200,
                    order
                }
            } else {
                return {
                    success: false,
                    status_code: 404,
                    message: [{
                        path: "notFound",
                        message: "the order doesn't exists"
                    }]
                }
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: "update",
                    message: "an error ocurred while updating the order"
                }]
            }
        }
    },
    get_me: async function (user_id) {
        try {
            let orders = await Order.find({ user_id: user_id }).populate({
                path: 'products',
                populate: {
                    path: 'product_id',
                    populate: {
                        path: 'category_id subcategory_id department_id'
                    }
                }
            }).populate("address_id user_id")
            if (orders.length > 0) {
                return {
                    success: true,
                    status_code: 200,
                    orders
                }
            } else {
                return {
                    success: false,
                    status_code: 404,
                    message: [{
                        path: "notFound",
                        message: "the user doesn't has orders yet"
                    }]
                }
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: "get",
                    message: "an error ocurred while updating the order"
                }]
            }
        }
    },
    get_all: async function (pagination, filter) {

        try {
            const totalOrders = await Order.countDocuments(filter)
            const totalPages = Math.ceil(totalOrders / pagination.limit)

            let orders = await Order.find(filter).skip(pagination.page > 0 ? (pagination.page - 1) * pagination.limit : 0)
                .limit(pagination.limit > 0 ? pagination.limit : 0).populate('user_id').populate('address_id').populate({
                    path: 'products',
                    populate: {
                        path: 'product_id',
                        populate: {
                            path: 'category_id subcategory_id department_id'
                        }
                    }
                })
            if (orders.length > 0) {
                return {
                    success: true,
                    status_code: 200,
                    orders,
                    pagination: {
                        page: parseInt(pagination.page) ,
                        limit: pagination.limit,
                        totalPages,
                        totalOrders: totalOrders
                    }
                }
            } else {
                return {
                    success: false,
                    status_code: 404,
                    message: [{
                        path: "notFound",
                        message: "the user doesn't has orders yet"
                    }]
                }
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: "get",
                    message: "an error ocurred while updating the order"
                }]
            }
        }
    }
}
export default orderServices