import Cart from '../models/Cart.js'

const cartServices = {
    create: async function (userId) {
        try {
            let data = {
                user_id: userId,
                address_id: null,
                products: [],
            }
            let newCart = await Cart.create(data)
            return {
                success: true,
                cart: newCart,
                status_code: 200
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'create',
                    message: 'There was an error while creating the cart'
                }]
            }
        }
    },
    getme_cart: async function (user_id) {
        try {
            let cart = await Cart.findOne({ user_id: user_id }).populate({
                path: 'products',
                populate: {
                    path: 'product_id',
                    populate: {
                        path: 'category_id subcategory_id department_id'
                    }
                }
            }).populate("address_id", "-user_id -createdAt -updatedAt -__v").select('-__v -updatedAt -createdAt -user_id')
            return {
                success: true,
                status_code: 200,
                cart
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'getmecart',
                    message: 'There was an error while reading the cart'
                }]
            }
        }
    },
    get_cart_order: async function (user_id) {
        try {
            let cart = await Cart.findOne({ user_id })
            let products_unpopulate = cart.products
            let cart_populate = await cart.populate({
                path: 'products',
                populate: {
                    path: 'product_id'
                }
            })
            let products_populate = cart_populate.products
            let address_id = cart.address_id
            return {
                products_unpopulate,
                products_populate,
                address_id
            }
        } catch (error) {
        }
    },
    add_product: async function (cart_id, body) {
        try {
            const { product_id, quantity } = body
            let cart = await Cart.findById(cart_id)
            const existingProduct = cart.products.find(product => product.product_id.toString() === product_id)
            if (existingProduct) {
                existingProduct.quantity = quantity
            } else {
                cart.products.push({
                    product_id: product_id,
                    quantity: quantity,
                })
            }
            cart.save()
            return {
                success: true,
                status_code: 200,
                cart: cart
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'add',
                    message: 'There was an error while add the cart'
                }]
            }
        }
    },
    delete_product: async function (cart_id, produc_id) {
        try {
            let cart = await Cart.findById(cart_id)
            if (cart) {
                let product_delete = cart.products.pull(produc_id)
                await cart.save()
                return {
                    success: true,
                    status_code: 200,
                    product_delete
                }
            } else {
                return {
                    success: false,
                    status_code: 404,
                    message: [{
                        path: 'notFound',
                        message: 'The product does not exist in the cart'
                    }]
                }
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'getcart',
                    message: 'There was an error while getting the cart'
                }]
            }
        }

    },
    get_by_id: async function (cart_id) {
        try {
            let cart = await Cart.findById(cart_id)
            if (cart) {
                return {
                    success: true,
                    cart,
                    status_code: 200
                }
            } else {
                return {
                    success: false,
                    status_code: 404,
                    message: [{
                        path: 'notFound',
                        message: 'No shopping cart found'
                    }]
                }
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'getcart',
                    message: 'There was an error while getting the cart'
                }]
            }
        }
    },
    clear_product: async function (cart_id) {
        try {
            let clear = await Cart.findById(cart_id)
            clear.products = []
            await clear.save()
            return {
                success: true,
                status_code: 200,
                clear: clear
            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'clearcart',
                    message: 'There was an error while clear the cart'
                }]
            }
        }
    },
    update_address: async function (cart_id, address_id) {
        try {
            let updateAddress = await Cart.findByIdAndUpdate(cart_id, address_id, { new: true })
            return {
                success: true,
                status_code: 200,
                updateAddress
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
    checkout: async function (cart_id) {
        try {
            console.log(cart_id)
            let checkout = await Cart.findById(cart_id)
            if (checkout) {
                this.clear_product(cart_id)
            }
            return {
                success: true,
                status_code: 200,
                cart: checkout

            }
        } catch (error) {
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'checkoutcart',
                    message: 'There was an error while checkout the cart'
                }]
            }
        }
    }
}
export default cartServices