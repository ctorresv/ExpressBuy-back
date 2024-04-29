import mongoose from 'mongoose'

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO)
  .then(() => console.log('database conected'))
  .catch(err => console.log(err))
