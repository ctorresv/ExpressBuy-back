import { Router } from "express";
import create from "../controllers/departments/create.js";
import read from "../controllers/departments/read.js";
import update from "../controllers/departments/update.js";
import getAllDepartments from "../controllers/departments/getAllDepartments.js";
import passport from '../middleware/passport.js'
import deparmentsExist from "../middleware/departments/departmentsExist.js";
import isAdmin from "../middleware/products/isAdmin.js";
import validator from "../middleware/validator.js"
import { createDepartments, updateDepartments } from "../schema/departments.js";

const router = Router()



router.post('/', validator(createDepartments), passport.authenticate('jwt', { session: false }), deparmentsExist, isAdmin, create)
router.get('/admin', passport.authenticate('jwt', { session: false }), isAdmin, getAllDepartments)
router.get('/', read)
router.put('/:id', validator(updateDepartments), passport.authenticate('jwt', { session: false }), isAdmin, update)


export default router