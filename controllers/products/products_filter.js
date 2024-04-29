import Product from "../../models/Product.js";

let filtered = async(req,res,next) => {
    try {
        let queries = {}
        let pagination = {
            limit: 5,
            page: 1
        }

        req.query.title ? queries.title = new RegExp(req.query.title.trim(), 'i') : ''
        req.query.category_id ? queries.category_id = req.query.category_id : ''
        req.query.subCategory_id ? queries.subCategory_id = req.query.subCategory_id : '' 
        //Armar logica para que el precio se maneje en rango(incluyendo)
        req.query.price ? queries.price = req.query.price : ''

        pagination.page = req.query.page ?? 1
        pagination.limit = req.query.limit ?? 5

        console.log(queries)
        let all = await Product
                    .find(queries)
                    .skip(pagination.page > 0 ? (pagination.page-1)*pagination.limit : 0)
                    .limit(pagination.limit > 0 ? pagination.limit : 0)
        return res.status(200).json({
            success: true,
            response: all
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Ha ocurrido un error'
        })
    }
}

export default filtered
