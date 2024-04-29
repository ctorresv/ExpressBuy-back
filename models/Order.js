import { Schema, model, Types } from 'mongoose'

const productSchema = new Schema({
  product_id: {
    type: Types.ObjectId,
    ref: "products",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
},
  {
    _id: false
  }
)

const schema = new Schema({
  user_id: {
    type: Types.ObjectId,
    ref: 'users',
    required: true
  },
  address_id: {
    type: Types.ObjectId,
    ref: 'addresses',
    required: true
  },
  products: [productSchema],
  n_order: {
    type: Number,
    required: true
  },
  total_price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancel'],
    default: 'pending',
    required: true
  },
  invoice_id: {
    type: Types.ObjectId,
    ref: "invoices",
    required: false
  },
  payment_date: {
    type: Date,
    required: false
  },
  shipped_date: {
    type: Date,
    required: false
  },
  delivered_date: {
    type: Date,
    required: false
  },
  cancel_date: {
    type: Date,
    required: false
  }
}, {
  timestamps: true
})
const collection = 'orders'

const Order = model(collection, schema)
export default Order
