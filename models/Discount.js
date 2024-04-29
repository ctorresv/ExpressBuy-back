import { Schema, model } from 'mongoose'

const schema = new Schema({
  active: {
    type: Boolean,
    required: true
  },
  percentage: {
    type: Number,
    required: true,
    default: 1 //numero entre 0 y 1 -> 1 - percetage / 100
  }
})

const collection = 'discounts'

const Discount = model(collection, schema)
export default Discount