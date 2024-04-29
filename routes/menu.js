import { Router } from "express";
const router = Router()
import getAll from "../controllers/menuAll/getAll.js";

router.get('/', getAll)


export default router