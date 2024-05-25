import httpStatus from 'http-status'
import { PropertyRequestServices } from './service.js'

const { CREATED, NO_CONTENT } = httpStatus

export const propertyRequestController = {
  createPropertyRequest: async (req, res, next) => {
    const {
      body: createPropertyRequestPayload,
      user: { _id: callerId }
    } = req

    try {
      const propertyRequest = await PropertyRequestServices.createPropertyRequest(createPropertyRequestPayload, { callerId })

      res.status(CREATED).send(propertyRequest)
    } catch (err) {
      return next(err)
    }
  },

  updatePropertyRequest: async (req, res, next) => {
    const {
      body: updatePropertyRequestPayload,
      params: { id: propertyRequestId },
      user: { _id: callerId }
    } = req

    try {
      await PropertyRequestServices.updatePropertyRequest({ ...updatePropertyRequestPayload, propertyRequestId }, { callerId })

      res.status(NO_CONTENT).send()
    } catch (err) {
      return next(err)
    }
  }
}
