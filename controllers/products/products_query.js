import productServices from "../../services/product.service.js"
// import Product from "../../models/Product.js"

const  productsQuery = async(req, res) =>{
    try {
        let pagination = {
            limit: 10,
            page:1
        }

       let filter ={
        //   price: { $gt : 2 , $lt : 45000}
       }
       
       if(req.query.category_id){
            filter.category_id = req.query.category_id
       }
       if(req.query.name){
        const trimmedName = req.query.name.trim() // Elimina los espacios en blanco al principio y al final del nombre
        const nameRegex = new RegExp(trimmedName, "gi") // modificamos la expresión regular para que sea global (g) e insensible a mayúsculas y minúsculas (i)
        filter.name = nameRegex
       }
       if(req.query.subcategory_id){
            filter.subcategory_id = req.query.subcategory_id
       }
       if(req.query.department_id){
            filter.department_id = req.query.department_id
       }
        if(req.query.page){
            pagination.page = req.query.page
            // pagination.page = parseInt(req.query.page)
            
        }
        if(!req.query.all){

            filter.active = true 
           
            
        }
        if (req.query.min_price || req.query.max_price) {
            
            filter.price = {
              $gte: req.query.min_price?req.query.min_price :0 , // Precio mayor o igual que el valor mínimo
              $lte: req.query.max_price?req.query.max_price: 9999999999999999  // Precio menor o igual que el valor máximo
            }
          }
        //    else if (req.query.price) {
        //     filter.price = req.query.price;
        //   }
       
       
        let response = await productServices.pagination_products(pagination, filter)

        
            return res.status(response.status_code).json({
                success: response.success,
                message: response.message,
                products: response.products,
                pagination: response.pagination //

            })
    } catch (error) {
        console.log(error);
    }
}

export default  productsQuery