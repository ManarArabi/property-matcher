import mongoose from 'mongoose'
import { UserRoles, UserStatus } from './constants.js'
import { PHONE_NUMBER_REGEX } from '../../../common/constants/regex.js'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },

  password: {
    type: String, // hashed
    required: true
  },

  phone: {
    type: String,
    required: true,
    unique: true,
    match: PHONE_NUMBER_REGEX
  },

  role: {
    type: String,
    required: true,
    enum: Object.values(UserRoles)
  },

  status: {
    type: String,
    required: true,
    enum: Object.values(UserStatus)
  }
})

export const Users = mongoose.model('users', userSchema)
