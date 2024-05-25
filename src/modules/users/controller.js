import { userServices } from './service.js'

import httpStatus from 'http-status'

const { OK } = httpStatus
export const userController = {
  login: async (req, res, next) => {
    const {
      body: { phone, password }
    } = req

    try {
      const jwt = await userServices.login({ phone, password })

      res.status(OK).send({ jwt })
    } catch (err) {
      return next(err)
    }
  }
}
