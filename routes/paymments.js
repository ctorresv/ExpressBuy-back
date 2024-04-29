import { Router } from 'express'
import sendPaymment from '../controllers/paymments/sendPaymment.js'
const router = Router()


router.post('/', sendPaymment)

export default router
