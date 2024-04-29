import express from 'express'

// COLOCAR CONTROLLERS
import newUser from '../controllers/users/signup.js'
import signIn from '../controllers/users/signin.js'
import signOut from '../controllers/users/signout.js'
import token from '../controllers/users/token.js'
// COLOCAR MIDDLE
import accountExistsSignUp from '../middleware/users/accountSignUp.js'
import accountExistsSignIn from '../middleware/users/accountSignIp.js'
import isVerified from '../middleware/users/isVerified.js'
import passwordIsOk from '../middleware/users/passIsOk.js'
import passport from '../middleware/passport.js'
import validator from '../middleware/validator.js'
// COLOCAR SCHEMAS
import { createUser, userSignIn } from '../schema/users.js'

const router = express.Router()


router.post('/signin', validator(userSignIn), accountExistsSignIn, isVerified, passwordIsOk, signIn)
router.post('/signup', validator(createUser), accountExistsSignUp, newUser)
router.post('/signout', passport.authenticate('jwt', { session: false }), signOut)
router.post('/token', passport.authenticate('jwt', { session: false }), token)

export default router
