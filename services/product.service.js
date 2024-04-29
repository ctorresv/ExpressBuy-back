import Product from "../models/Product.js";

const productServices = {
    create: async function (body) {
        try {
            body.active = true
            body.sales = 0
            let product = await Product.create(body)
            return {
                success: true,
                status_code: 201,
                product
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: "create",
                    message: "Error while creating a product"
                }]
            }
        }
    },
    update: async function (id, body) {
        try {
            let product = await Product.findByIdAndUpdate(id, body, { new: true })
            return {
                success: true,
                status_code: 201,
                product
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: "update",
                    message: "An error ocurred while updating product"
                }]
            }
        }

    },
    find: async function () {
        return null
    },
    delete: async function (id) {
        try {
            let product = await Product.findByIdAndDelete(id)
            if (product) {
                return {
                    success: true,
                    product,
                    status_code: 200
                }
            }
            return {
                success: false,
                message: [{
                    path: "notFound",
                    message: "The product doesnt exists"
                }],
                status_code: 404
            }

        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: "delete",
                    message: "an error ocurred while deleting product"
                }]
            }
        }

    },
    get_one: async function (id) {
        try {
            let product = await Product.findById(id).populate('department_id category_id subcategory_id discount_id')
            if (product) {
                return {
                    success: true,
                    status_code: 201,
                    product
                }
            } else {
                return {
                    success: false,
                    status_code: 404,
                    message: [{
                        path: "notFound",
                        message: "the product does not exist"
                    }]
                }
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: "get",
                    message: "There was an error while getting the product"
                }]
            }
        }

    },
    active: async function (id) {
        try {
            let product = await Product.findById(id)
            if (product) {
                product.active = !product.active
                await product.save()
                return {
                    success: true,
                    product,
                    status_code: 200
                }
            }
            return {
                success: false,
                message: [{
                    path: "notFound",
                    message: "the product does not exist"
                }],
                status_code: 404
            }
        } catch (error) {
            return {
                success: false,
                message: [{
                    path: "update",
                    message: "There was an error while updating the product"
                }]
            }
        }

    },
    substract_stock: async function (products) {
        let error = []
        for (let product of products) {
            let bd_product = await Product.findById(product.product_id)
            if (bd_product) {
                if (bd_product.stock - product.quantity >= 0) {
                    bd_product.stock = bd_product.stock - product.quantity
                    bd_product.sales = bd_product.sales + product.quantity
                    await bd_product.save()
                } else {
                    let newError = {
                        path: bd_product._id,
                        message: "no stock"
                    }
                    error.push(newError)
                }

            } else {
                let newError = {
                    path: product.product_id,
                    message: "The product doesn't exists"
                }
                error.push(newError);
            }
        }
        if (error.length > 0) {
            return {
                success: false,
                error,
                message: "some items has problems"
            }
        } else {
            return {
                success: true,
                message: "Success"
            }
        }
    },
    get_discounts: async function () {
        try {

            let products = await Product.find({ active: true }).populate("category_id subcategory_id department_id discount_id")
            const filterProducts = products.filter((item) => item.discount_id.active);
            return {
                success: true,
                status_code: 200,
                products: filterProducts
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: "get_discounts",
                    message: "An error ocurred while discounts product"
                }]
            }
        }
    },

    pagination_products: async function (pagination, filter) {
        try {

            const totalProductsCount = await Product.countDocuments(filter) //

            const totalPages = Math.ceil(totalProductsCount / pagination.limit) //


            const products = await Product.find(filter).skip(pagination.page > 0 ? (pagination.page - 1) * pagination.limit : 0)
                .limit(pagination.limit > 0 ? pagination.limit : 0)
                .populate('discount_id')
                .populate('category_id')
                .populate('department_id')
                .populate('subcategory_id')

            return {
                success: true,
                status_code: 200,
                products: products,
                pagination: { //
                    page: parseInt(pagination.page),
                    limit: pagination.limit,
                    totalPages,
                    totalProducts: totalProductsCount
                }
            }
        } catch (error) {
            console.log(error)

        }
    },
    existsProducts: async function (body) {
        try {
            const { name } = body
            const existsProductName = await Product.findOne({name})

            return {
                success: true,
                status_code: 200,
                existsProductName
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'existsproducts',
                    message: 'There was an error while checking  the products name'
                }]
            }

        }
    }
}
export default productServices