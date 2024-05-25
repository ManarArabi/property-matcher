import httpStatus from 'http-status'
import { PropertyRequestServices } from './service.js'

const { CREATED } = httpStatus

export const propertyRequestController = {
  createPropertyRequest: async (req, res, next) => {
    const {
      body: createdPropertyRequest,
      user: { _id }
    } = req

    try {
      const propertyRequest = await PropertyRequestServices.createPropertyRequest(createdPropertyRequest, { _id })

      res.status(CREATED).send(propertyRequest)
    } catch (err) {
      return next(err)
    }
  }
}
