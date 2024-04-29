import productServices from "../../services/product.service.js"

async function existsProduct(req, res, next) {
    try {
        const response = await productServices.existsProducts(req.body)
        if (response.existsProductName) {
            return res.status(400).json({
                success: false,
                message: [{
                    path: 'existsproduct',
                    message: 'The product already exists'
                }]
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:[{
                path: 'Error',
                message: 'Error internal server'
            }]
        })
    }
}

export default existsProduct
