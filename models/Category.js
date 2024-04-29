import { Schema, model, Types } from 'mongoose'

const schema = new Schema({
  active: {type: Boolean, required: true},
  name: {
    type: String,
    required: true
  },
  department_id: {
    type: Types.ObjectId,
    ref: 'departments',
    required: true
  }
}, {
  timestamps: true
})
const collection = 'categories'

const Category = model(collection, schema)

export default Category
