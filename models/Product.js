import { Schema, model, Types } from 'mongoose'

const schema = new Schema({
  active: {
    type: Boolean,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  ean13: {
    type: Number,
    required: false
  },
  stock: {
    type: Number,
    required: true
  },
  sales: {
    type: Number,
    required: true
  },
    discount_id: {
    type: Types.ObjectId,
    ref: 'discounts',
    required: true
  },
  department_id: {
    type: Types.ObjectId,
    ref: 'departments',
    required: true
  },
  category_id:
  {
    type: Types.ObjectId,
    ref: 'categories',
    required: true
  },
  subcategory_id: {
    type: Types.ObjectId,
    ref: 'subcategories',
    required: true
  },
},
{
  timestamps: true
})

const collection = 'products'

const Product = model(collection, schema)

export default Product