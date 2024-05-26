import { UserServices } from './service.js'

import httpStatus from 'http-status'

const { OK } = httpStatus
export const userController = {
  login: async (req, res, next) => {
    const {
      body: { phone, password }
    } = req

    try {
      const jwt = await UserServices.login({ phone, password })

      res.status(OK).send({ jwt })
    } catch (err) {
      return next(err)
    }
  },

  getUsersStats: async (req, res, next) => {
    const {
      query: { limit = 20, skip = 0 }
    } = req

    try {
      const usersStats = await UserServices.getUsersStats({ skip, limit })

      res.status(OK).send(usersStats)
    } catch (err) {
      return next(err)
    }
  }
}
