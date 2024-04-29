import Invoice from '../../models/Invoice.js'
import nodemailer from 'nodemailer'
import { sendInvoice } from '../html/invoiceSend.js'


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})

const create = async (req, res, next) => {
    const { name, email } = req.user
    try {
        await Invoice.create(req.body)
        const mailOptions = {
            from: 'expressbuymh@gmail.com',
            to: email,
            subject: 'Hello, we have successfully received your payment, thank you very much for your purchase.',
            html: sendInvoice({ name, messageText: 'Thank you for trusting us, here you have the invoice of your purchase.', textButton: 'Download Invoice' })
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('send email:', info.response)
            }
        })
        return res.status(201).json({
            success: true,
            message: 'Invoice Created!'
        })
    } catch (error) {
        console.log(error)
    }
}

export default create
