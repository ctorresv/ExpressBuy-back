import { Router } from 'express'
//middlewares
import passport from '../middleware/passport.js'
//controllers
import statusPaid from '../controllers/orders/status_paid.js'
import statusShipped from '../controllers/orders/status_shipped.js'
import statusDelivered from '../controllers/orders/status_delivered.js'
import statusCancel from '../controllers/orders/status_cancel.js'
import myOrders from '../controllers/orders/get_me.js'
import getOrders from '../controllers/orders/admin_orders.js'
const router = Router()


//cambia la orden a paid
router.put('/paid/:id', statusPaid)
router.put('/shipped/:id', passport.authenticate('jwt',{session: false}), statusShipped)
router.put('/delivered/:id', passport.authenticate('jwt',{session: false}), statusDelivered)
router.put('/cancel/:id', passport.authenticate('jwt',{session: false}), statusCancel)
router.get('/me', passport.authenticate('jwt',{session: false}), myOrders)
router.get('/', passport.authenticate('jwt',{session: false}), getOrders)



export default router







