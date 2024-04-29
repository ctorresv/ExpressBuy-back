import { Schema, model, Types } from 'mongoose'

const schema = new Schema({
  active: {type: Boolean, required: true},
  category_id: {
    type: Types.ObjectId,
    ref: 'categories',
    requiered: true
  },
  name: {
    type: String,
    required: true
  }
})

const collection = 'subcategories'

const Subcategory = model(collection, schema)
export default Subcategory
