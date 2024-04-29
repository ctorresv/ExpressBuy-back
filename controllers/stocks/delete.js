/* import Stock from "../../models/Stocks.js";

const destroy = async(req,res,next) => {
    try {
        let destroyed = await Stock.findByIdAndDelete({ _id: req.params.id })
        if(destroyed) {
            return res.status(200).json({
                success: true,
                message: 'Deleted',
                destroyed
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Not found'
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Server error'
        })
    }
}

export default destroy */