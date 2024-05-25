import bcrypt from 'bcrypt'
import { config } from 'dotenv'
import jwt from 'jsonwebtoken'

config()

/**
 * Taking a plain data, generates a salt and hashes it
 * using bcrypt
 *
 * @param {Any} data - plain data
 * @param {Number} [SALT_WORK_FACTOR=10] - salt, defaults as 10
 *
 * @returns {Promise<String>} hash
 */
export const hashData = async (data, SALT_WORK_FACTOR = 10) => {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)

  return bcrypt.hash(data, salt)
}

/**
 * It generates a jwt with the provided data
 *
 * @param {Object} args
 * @param {Object} args.data
 * @param {Object} args.jwtOptions
 *
 * @returns {String}
 */
export const generateJwt = ({ data, jwtOptions = {} }) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { ...jwtOptions, expiresIn: '2 days' })

  return token
}
