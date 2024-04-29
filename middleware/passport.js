import passport from 'passport'
import passportJwt from 'passport-jwt'
import User from '../models/User.js'

passport.use(
  new passportJwt.Strategy({
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
  },
  async (jwtPayload, done) => {
    try {
      const user = await User.findOne({ _id: jwtPayload.id })
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (error) {
      return done(error, false)
    }
  })
)

export default passport
