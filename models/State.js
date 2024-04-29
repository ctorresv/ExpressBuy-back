import { Schema, model, Types } from 'mongoose'

const schema = new Schema({
    type: {
        type: String,
        required: true
    },
    code_id: {
        type: Number,
        required: true,
    },
    n_order: {
        type: Types.ObjectId,
        ref: 'orders',
        required: true
    }
})

const collection = 'status'

const State = model(collection, schema)
export default State