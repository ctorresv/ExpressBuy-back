import { Router } from 'express'
import create from '../controllers/subcategories/create.js'
import read from '../controllers/subcategories/read.js'
import getAllSubcategoryes from '../controllers/subcategories/getAllSubCategoryes.js'
import update from '../controllers/subcategories/update.js'
import changeActive from '../controllers/subcategories/changeActive.js'
import destroy from '../controllers/subcategories/delete.js'
import passport from '../middleware/passport.js'
import subcategoryExists from '../middleware/subcategories/checkExists.js'
import isAdmin from '../middleware/products/isAdmin.js'
import validator from '../middleware/validator.js'
import { createSubCategory, updateSubCategory } from '../schema/subcategories.js'

const router = Router()

router.post('/', validator(createSubCategory), passport.authenticate('jwt', { session: false }), subcategoryExists, isAdmin, create)
router.get('/', read)
router.put('/property/:id', passport.authenticate('jwt', { session: false }), isAdmin, changeActive)
router.get('/admin', passport.authenticate('jwt', { session: false }), isAdmin, getAllSubcategoryes)
router.put('/:id', validator(updateSubCategory), passport.authenticate('jwt', { session: false }), isAdmin, update)
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, destroy)

export default router
