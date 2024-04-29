import { Router } from "express";
import notification from "../controllers/status/success.js";
import passport from "../middleware/passport.js"
const router = Router()


router.post('/notification', notification)


export default router