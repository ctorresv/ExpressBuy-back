import { Router } from 'express'

import passport from '../middleware/passport.js'
import validator from '../middleware/validator.js'
import create from '../controllers/categories/create.js'
import read from '../controllers/categories/read.js'
import update from '../controllers/categories/update.js'
import destroy from '../controllers/categories/delete.js'
import read_actives from '../controllers/categories/read_actives.js'
import verify_role_admin from '../middleware/categories/user_verification_middles/verify_role_admin.js'
import isVerified from '../middleware/users/isVerified.js'
import categoryExistsByName from '../middleware/categories/category_verification_middles/categoryExistsByName.js'  

import { createCategory, updateCategory } from '../schema/categories.js'

const router = Router()

router.post('/',passport.authenticate('jwt', { session: false }),validator(createCategory),verify_role_admin, isVerified, categoryExistsByName, create)
router.get('/admin',passport.authenticate('jwt', { session: false }),verify_role_admin, isVerified ,read)  //middle para verificar role
router.get('/', read_actives)
router.put('/:id',passport.authenticate('jwt', { session: false }),validator(updateCategory) ,verify_role_admin, update)
router.delete('/:id',passport.authenticate('jwt', { session: false }),verify_role_admin, destroy)

export default router
