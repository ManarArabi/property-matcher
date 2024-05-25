import httpStatus from 'http-status'
import HttpError from '../http-error.js'

const { FORBIDDEN } = httpStatus

export const authorize = (roles) => async (req, res, next) => {
  try {
    const user = req.user

    if (!roles.includes(user.role)) {
      throw new HttpError({ status: FORBIDDEN, message: 'User doesn\'t have access' })
    }

    next()
  } catch (e) {
    res.status(FORBIDDEN).send({ message: 'User doesn\'t have access' })
  }
}
