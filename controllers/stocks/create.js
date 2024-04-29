/* import Stock from "../../models/Stocks.js";

let create = async(res,req,next) => {
    try {
        let stock = await Stock.create(req.body)
        await stock.save()
        return res.status(200).json({
            id: one_id
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Server error'
        })
    }
}

export default create */