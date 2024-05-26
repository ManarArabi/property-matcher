import httpStatus from 'http-status'
import { AdServices } from './service.js'

const { CREATED, OK } = httpStatus

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
  },

  getAdPropertyRequestMatches: async (req, res, next) => {
    const {
      params: { id: adId },
      query: { skip = 0, limit = 20 },
      user: { _id: callerId, role: callerRole }
    } = req

    try {
      const propertyRequests = await AdServices.getAdsPropertyRequestsMatches({ adId }, { skip, limit }, { callerId, callerRole })

      res.status(OK).send(propertyRequests, { skip, limit }, { callerId })
    } catch (err) {
      return next(err)
    }
  }
}
