import httpStatus from 'http-status'
import { AdServices } from './service.js'

const { CREATED } = httpStatus

export const AdsController = {
  createAd: async (req, res, next) => {
    const {
      body: createdAdPayload,
      user: { _id }
    } = req

    try {
      const ad = await AdServices.createAd(createdAdPayload, { _id })

      res.status(CREATED).send(ad)
    } catch (err) {
      return next(err)
    }
  }
}
