import httpStatus from 'http-status'
import HttpError from '../../common/http-error.js'
import { AdServices } from '../ads/service.js'
import { PropertyRequest } from './model/schema.js'
import _ from 'lodash'

const { NOT_FOUND, FORBIDDEN } = httpStatus

export const PropertyRequestServices = {
  /**
   * It creates property request with the provided properties
   *
   * @param {Object} args
   * @param {String} args.city
   * @param {String} args.district
   * @param {String} args.description
   * @param {String} args.propertyType
   * @param {Object} args.price
   * @param {number} args.price.amount
   * @param {String} args.price.currency
   * @param {Object} args.area
   * @param {number} args.area.number
   * @param {String} args.area.unit
   *
   * @param {Object} callerData
   * @param {String} callerData.callerId
   *
   * @returns {Promise<PropertyRequest>}
   */
  createPropertyRequest: async ({ city, district, description, propertyType, price, area }, { callerId }) => {
    const matches = await AdServices.getMatchIds({ city, district, price, propertyType, area })

    const propertyRequest = await PropertyRequest.create({ city, district, description, propertyType, price, area, createdBy: callerId, matches })
    return propertyRequest
  },

  /**
   * It updates property request with the provided properties
   *
   * @param {Object} args
   * @param {mongoose.Types.ObjectId} args.propertyRequestId
   * @param {String} [args.description]
   * @param {Object} [args.price]
   * @param {number} [args.price.amount]
   * @param {String} [args.price.currency]
   * @param {Object} [args.area]
   * @param {number} [args.area.number]
   * @param {String} [args.area.unit]
   *
   * @param {Object} callerData
   * @param {String} callerData.callerId
   *
   * @returns {Promise<PropertyRequest>}
   */
  updatePropertyRequest: async ({ propertyRequestId, description, price, area }, { callerId }) => {
    const propertyRequest = await PropertyRequest.findOne({ _id: propertyRequestId }).lean()
    if (_.isNil(propertyRequest)) {
      throw new HttpError({ status: NOT_FOUND, message: 'there is no property request with this id' })
    }

    if (String(callerId) !== String(propertyRequest.createdBy)) {
      throw new HttpError({ status: FORBIDDEN, message: 'There is no property with this id' })
    }

    const matchesIds = await AdServices.getMatchIds({
      propertyType: propertyRequest.propertyType,
      city: propertyRequest.city,
      district: propertyRequest.district,
      price: price || propertyRequest.price,
      area: area || propertyRequest.area
    })

    const updatePayload = _.omitBy({ description, price, area, matches: matchesIds, refreshedAt: new Date() }, _.isNil)
    await PropertyRequest.updateOne({ _id: propertyRequestId }, { $set: updatePayload })
  }
}
