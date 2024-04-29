import { Router } from 'express'
import create from '../controllers/address/create.js'
import get_me from '../controllers/address/get_me.js'
import update from '../controllers/address/update.js'
import deleteAddress from '../controllers/address/delete.js'
import validator from '../middleware/validator.js'
import passport from '../middleware/passport.js'
import isVerified from '../middleware/users/isVerified.js'
import addressExists from '../middleware/addresses/addressExists.js'
import { createAddress, updateAddress } from '../schema/address.js'
import isProperty from '../middleware/addresses/isProperty.js'

const router = Router()

router.post('/', passport.authenticate('jwt', { session: false }), validator(createAddress), isVerified, addressExists, create)
router.get('/me', passport.authenticate('jwt', { session: false }), get_me)
router.put('/:id', passport.authenticate('jwt', { session: false }), validator(updateAddress), isVerified, update)
router.delete('/:id', validator(updateAddress), passport.authenticate('jwt', { session: false }), isProperty, deleteAddress)


export default router