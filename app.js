import 'dotenv/config.js'
import './config/database.js'
import createError from 'http-errors'
import express from 'express'

import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import { __dirname } from './utils.js'
import mercadopago from 'mercadopago'
import indexRouter from './routes/index.js'
import ngrok from 'ngrok'



const app = express()


mercadopago.configure({ access_token: process.env.ACCESS_TOKEN })
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use((req, res, next) => {
  console.log("Petición solicitada!!")
  next()
})

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// router
app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})



export default app
