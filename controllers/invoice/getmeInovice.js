import invoiceServices from "../../services/invoice.service.js";

const getme_invoice = async (req, res, next) => {
    try {
        let response = await invoiceServices.getme_invoice(req.user.id)
        return res.status(response.status_code).json({
            succces: response.success,
            invoices: response.invoices
        })
    } catch (error) {
        console.log(error);
    }
}
export default getme_invoice