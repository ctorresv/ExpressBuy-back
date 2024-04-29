import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true
  },
  address_line: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  zip_code: {
    type: Number,
    required: true,
  },
  telephone: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})
const collection = 'addresses'

const Address = mongoose.model(collection, schema)
export default Address