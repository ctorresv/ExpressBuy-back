import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: true
  }
})

const collection = 'departments'

const Department = model(collection, schema)
export default Department
