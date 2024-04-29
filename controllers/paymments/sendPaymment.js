import mercadopago from 'mercadopago'

const sendPaymment = (req, res, next) => {
    try {
        const preference = {
            external_reference: req.body.order_id,
            items: [req.body],
            //el link es este "init_point": "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=102965140-f8a87415-333a-4de0-bfeb-7b464d752da7"//
            back_urls: {
                success: 'https://front-web-six.vercel.app/payment/success',
                failure: '',
                pending: '',
            },
            auto_return: 'approved',
            binary_mode: true
        }
        mercadopago.preferences.create(preference)
            .then(response => res.status(200).send({ response }))
            .catch(error => {
                console.log(error)
                res.status(400).send({ error: error.message })
            })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export default sendPaymment
