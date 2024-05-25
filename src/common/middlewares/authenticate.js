import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import { Users } from '../../modules/users/model/schema.js'
import _ from 'lodash'
import HttpError from '../http-error.js'

const { UNAUTHORIZED } = httpStatus

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const user = await Users.findOne({ phone: decoded.phone }).lean()

    if (_.isNil(user)) {
      throw new HttpError({ status: UNAUTHORIZED, message: 'Invalid jwt' })
    }

    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.status(UNAUTHORIZED).send({ message: 'Invalid jwt' })
  }
}
