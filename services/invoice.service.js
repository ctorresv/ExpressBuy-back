import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Invoice from "../models/Invoice.js";
import { PDFDocument, StandardFonts, degrees } from 'pdf-lib';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const invoicesDirectory = join(__dirname, '..', 'invoices');

const invoiceServices = {
    create_invoice: async function (body, user, products) {

        body = {
            ...body,
            payment_method: body?.payment_method || "debito",
            payment_date: body?.createdAt,
            total_price: body?.total_price || null,
            user_id: user._id,
            items: products?.product_id

        }
        try {
            const invoice = await Invoice.create(body)
            const pdfDoc = await PDFDocument.create()
            const page = pdfDoc.addPage()
            const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
            const fontSize = 12;

            page.setFont(timesRomanFont)
            page.setFontSize(fontSize)
            const logoImagePath = './Image/bannner.jpg';
            const logoImageBytes = fs.readFileSync(logoImagePath);
            const logoImage = await pdfDoc.embedJpg(logoImageBytes);
            page.drawImage(logoImage, {
                x: 50,
                y: 750,
                width: 520,
                height: 100,
                rotate: degrees(0),
            })
            const emitterX = 50
            const emitterY = 720
            const emitterLineHeight = fontSize + 2
            page.drawText('ExpressBuy Mh', { x: emitterX, y: emitterY, font: timesRomanFont, size: fontSize + 2 })
            page.drawText('0351-7715807', { x: emitterX, y: emitterY - (emitterLineHeight * 3), font: timesRomanFont, size: fontSize })
            page.drawText('https://expressbuymh.com.ar', { x: emitterX, y: emitterY - (emitterLineHeight * 4), font: timesRomanFont, size: fontSize })
            page.drawText('expressbuymh@gmail.com', { x: emitterX, y: emitterY - (emitterLineHeight * 5), font: timesRomanFont, size: fontSize })

            // Datos del cliente
            const billToX = 50
            const billToY = 600
            const billToLineHeight = fontSize + 2
            page.drawText('Bill to:', { x: billToX, y: billToY, font: timesRomanFont, size: fontSize + 2 })
            page.drawText(`Name: ${user.name}`, { x: billToX, y: billToY - billToLineHeight, font: timesRomanFont, size: fontSize })
            page.drawText(`Lastname: ${user.last_name}`, { x: billToX, y: billToY - (billToLineHeight * 2), font: timesRomanFont, size: fontSize })
            page.drawText(`Address: añadir`, { x: billToX, y: billToY - (billToLineHeight * 3), font: timesRomanFont, size: fontSize })
            page.drawText('+555 7 123-5555', { x: billToX, y: billToY - (billToLineHeight * 4), font: timesRomanFont, size: fontSize })
            page.drawText(`Email: ${user.email}`, { x: billToX, y: billToY - (billToLineHeight * 5), font: timesRomanFont, size: fontSize })

            // Datos de la factura
            const invoiceDetailsX = 300
            const invoiceDetailsY = 600
            const invoiceDetailsLineHeight = fontSize + 2
            page.drawText(`Invoice No.${body.n_order}`, { x: invoiceDetailsX, y: invoiceDetailsY, font: timesRomanFont, size: fontSize })
            page.drawText(`Invoice Date:${body.createdAt}`, { x: invoiceDetailsX, y: invoiceDetailsY - (invoiceDetailsLineHeight * 2), font: timesRomanFont, size: fontSize })

            // Detalles de los ítems
            const itemsX = 50
            const itemsY = 500
            const itemsLineHeight = fontSize + 2
            page.drawText('Item', { x: itemsX, y: itemsY, font: timesRomanFont, size: fontSize })
            page.drawText('Quantity', { x: itemsX + 100, y: itemsY, font: timesRomanFont, size: fontSize })
            page.drawText('Price', { x: itemsX + 200, y: itemsY, font: timesRomanFont, size: fontSize })
            /*             page.drawText('Discount', { x: itemsX + 300, y: itemsY, font: timesRomanFont, size: fontSize }) */
            page.drawText('Linetotal', { x: itemsX + 400, y: itemsY, font: timesRomanFont, size: fontSize })


            let currentY = itemsY - itemsLineHeight;

            {
                products && products.map((item) => {
                    page.drawText(item.product_id.name, { x: itemsX, y: currentY, font: timesRomanFont, size: fontSize })
                    page.drawText(item.quantity.toString(), { x: itemsX + 100, y: currentY, font: timesRomanFont, size: fontSize })
                    page.drawText(item.product_id.price.toString(), { x: itemsX + 200, y: currentY, font: timesRomanFont, size: fontSize })
                    /* page.drawText("0%", { x: itemsX + 300, y: currentY, font: timesRomanFont, size: fontSize }) */
                    page.drawText((item.quantity * item.product_id.price).toString(), { x: itemsX + 400, y: currentY, font: timesRomanFont, size: fontSize })
                })
            }
            currentY -= itemsLineHeight;



            // Cálculos de totales
            const totalsX = 400
            const totalsY = 200
            const totalsLineHeight = fontSize + 2
            page.drawText('Total:', { x: totalsX, y: totalsY - (totalsLineHeight * 2), font: timesRomanFont, size: fontSize })
            page.drawText(`$ ${body.total_price}`, { x: totalsX + 100, y: totalsY - (totalsLineHeight * 2), font: timesRomanFont, size: fontSize })

            // Términos y notas
            const termsX = 50
            const termsY = 100
            const termsLineHeight = fontSize + 2
            page.drawText('Terms & Notes', { x: termsX, y: termsY, font: timesRomanFont, size: fontSize + 2 })
            page.drawText('Fred, thank you very much. We really appreciate your business.', { x: termsX, y: termsY - termsLineHeight, font: timesRomanFont, size: fontSize })
            page.drawText('Please send payments before the due date.', { x: termsX, y: termsY - (termsLineHeight * 2), font: timesRomanFont, size: fontSize })

            const pdfBytes = await pdfDoc.save()
            const filePath = join(invoicesDirectory, `${invoice._id}.pdf`)
            fs.writeFileSync(filePath, pdfBytes)
            invoice.pdf_file = filePath
            invoice.pdf_data = Buffer.from(pdfBytes)
            await invoice.save()

            return {
                success: true,
                status_code: 201,
                invoice
            };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'internal',
                    message: 'Error internal server'
                }]
            };
        }
    },
    getme_invoice: async function (user_id) {
        try {
            let invoices = await Invoice.find({ user_id })
            return {
                success: true,
                status_code: 200,
                invoices
            }
        } catch (error) {
            console.log(error);
        }

    }
};

export default invoiceServices;
