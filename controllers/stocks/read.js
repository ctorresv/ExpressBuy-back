/* import Stocks from './../../models/Stocks.js'

let read = async(req,res,next) => {
    try {
        let allStocks = await Stocks.find()
        return res.status(200).json({
            success: true,
            response: allStocks
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Ha ocurrido un error'
        })
    }
}

export default read */