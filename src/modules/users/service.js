import { generateJwt } from '../../common/utils/password.js'
import { Users } from './model/schema.js'
import bcrypt from 'bcrypt'
import HttpError from '../../common/http-error.js'
import _ from 'lodash'
import httpStatus from 'http-status'

const { NOT_FOUND, UNAUTHORIZED } = httpStatus

export const UserServices = {
  /**
   * It returns jwt if the provided phone and password are valid
   *
   * @param {Object} args
   * @param {String} args.phone
   * @param {String} args.password
   *
   * @returns {Promise<String>}
   */
  login: async ({ phone, password }) => {
    const user = await Users.findOne({ phone }, { password: 1, name: 1, role: 1, phone: 1 }).lean()

    if (_.isNil(user)) {
      throw new HttpError({ status: NOT_FOUND, message: 'there is no user with this number' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new HttpError({ status: UNAUTHORIZED, message: 'Wrong password' })
    }

    const { password: hashedPassword, ...userData } = user

    const jwt = await generateJwt({ data: userData })
    return jwt
  }
}
