import { Router } from "express";
import passport from '../middleware/passport.js'
import create from "../controllers/carts/create.js";
import addProducts from "../controllers/carts/addProduct.js";
import clearProduct from "../controllers/carts/clearProduct.js";
import getmeCart from "../controllers/carts/getme_cart.js";
import checkoutProduct from "../controllers/carts/checkout.js";
import deleteProduct from "../controllers/carts/deleteProduct.js";
import cartAddressUpdate from "../controllers/carts/cartAddressUpdate.js";
import checkAddress from "../middleware/carts/checkAddress.js";
import checkProducts from "../middleware/carts/checkProducts.js";
import isVerified from '../middleware/users/isVerified.js'

const router = Router()

//esto es interno hay q sacar el post de carrito dejar solo el de producto

router.post('/', passport.authenticate('jwt', { session: false }), isVerified, create)
router.post('/addproducts/:id', passport.authenticate('jwt', { session: false }), isVerified, addProducts)
router.post('/deleteproduct/:id', passport.authenticate('jwt', { session: false }), isVerified, deleteProduct)
router.put('/clear/:id', passport.authenticate('jwt', { session: false }), isVerified, clearProduct)
router.get('/', passport.authenticate('jwt', { session: false }), isVerified, getmeCart)
router.put('/checkout/:id', passport.authenticate('jwt', { session: false }), isVerified, checkAddress, checkProducts, checkoutProduct)
router.put('/address/:id', passport.authenticate('jwt', { session: false }), cartAddressUpdate)


export default router