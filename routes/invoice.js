import { Router } from 'express'
import create from '../controllers/invoice/create.js'
import passport from '../middleware/passport.js'
import validator from '../middleware/validator.js'
import getme_invoice from '../controllers/invoice/getmeInovice.js'
import { createInvoice } from '../schema/invoice.js'
const router = Router()


router.post('/', passport.authenticate('jwt', { session: false }), validator(createInvoice), create)
router.get('/', passport.authenticate('jwt', { session: false }), getme_invoice)


export default router
