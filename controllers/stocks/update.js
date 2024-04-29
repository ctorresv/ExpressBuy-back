/* import Stock from "../../models/Stocks.js";

const update = async(res,req,next) => {
    try {
        let response = await Stock.findByIdAndUpdate({ _id: req.params.id }, req.body, {new: true})
        if(response) {
            return res.status(200).json({
                success: true,
                message: 'Update',
                response
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

export default update */