import VerifyCode from '../controllers/html/userCreate.js'
import { sendInvoice } from '../controllers/html/invoiceSend.js'

const emailServices = {
  send_create_user: function (body) {
    try {
      let send_email = VerifyCode(body, { textButton: 'Verify Code', verifyCode: body.verify_code })
      return {
        success: true,
        status_code: 200,
        send_email
      }
    } catch (error) {
      return {
        success: false,
        status_code: 500,
        message: [{
          path: 'sendemailuser',
          message: 'Could not send the email, please try again later'
        }]
      }
    }
  },
  send_invoice: function (body, pdf) {
    try {
      let send_email = sendInvoice(body, { textButton: 'Download Invoice', messageText: 'Thank you very much for choosing us, here you have your invoice', pdfFilePath: pdf.invoice.pdf_file, pdf: 'Invoice' })
      return {
        success: true,
        status_code: 200,
        send_email
      }
    } catch (error) {
      return {
        success: false,
        status_code: 500,
        message: [{
          path: 'sendemailuser',
          message: 'Could not send the email, please try again later'
        }]
      }
    }
  }

}
export default emailServices