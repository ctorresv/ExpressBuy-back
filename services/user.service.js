import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import bcryptjs from 'bcryptjs'

const usersServices = {
  sign_up: async function (body) {
    body.password = bcryptjs.hashSync(body.password, 10)
    const verify = body.verify_code = crypto.randomBytes(10).toString('hex')
    body.is_online = false
    body.role = 0
    body.is_verified = true
    try {
      let sign_up = await User.create(body)
      if (sign_up) {
        console.log(sign_up._id)
        return {
          success: true,
          status_code: 201,
          sign_up,
          verify
        }
      } else {
        return {
          success: false,
          status_code: 404
        }
      }
    } catch (error) {
      return {
        success: false,
        status_code: 500,
        message: [{
          path: 'internal',
          message: 'Error internal server'
        }]
      }
    }
  },

  sign_in: async function (body) {
    try {
      const { email } = body
      const user = await User.findOneAndUpdate({ email }, { is_online: true }, { new: true }).select("-password -__v -verify_code -is_online -is_verified -createdAt -updatedAt")
      const token = await this.jwt_sign(user)
      return {
        success: true,
        status_code: 200,
        token,
        user
      }
    } catch (error) {
      return {
        success: false,
        status_code: 500,
        message: [{
          path: 'Sign in',
          message: 'Failed to login'
        }]
      }
    }
  },

  sign_out: async function (email) {
    try {
      let signout = await User.findOneAndUpdate({ email }, { is_online: false }, { new: true })
      return {
        success: true,
        status_code: 200,
        signout
      }
    } catch (error) {
      return {
        success: false,
        status_code: 500,
        message: [{
          path: 'Sign out',
          message: 'Error while credential'
        }]
      }
    }
  },

  sign_in_token: async function (user) {
    try {
      const token = await this.jwt_sign({ user })
      return {
        success: true,
        status_code: 200,
        user,
        token
      }
    } catch (error) {
      return {
        success: false,
        status_code: 500,
        message: [{
          path: 'Sign in',
          message: 'Failed to login'
        }]
      }
    }
  },

  jwt_sign: async function (user) {
    try {
      const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 60 * 60 * 24 })
      return {
        token
      }
    } catch (error) {
      return {
        success: false,
        status_code: 500,
        message: [{
          path: 'Token',
          message: 'Error no token'
        }]
      }
    }
  },
  acount_exist: async function(email){
    try {
      let user = await User.findOne({email})
      return user;
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default usersServices
