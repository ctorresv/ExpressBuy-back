import { Schema, model } from 'mongoose'

const schema = new Schema({

  name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verify_code: {
    type: String,
    required: true
  },
  is_online: {
    type: Boolean,
    required: true
  },
  is_verified: {
    type: Boolean,
    required: true
  },
  role: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

const collection = 'users'
const User = model(collection, schema)

export default User
