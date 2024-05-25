import { AdServices } from '../ads/service.js'
import { PropertyRequest } from './model/schema.js'

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
   * @param {String} callerData._id
   *
   * @returns {Promise<PropertyRequest>}
   */
  createPropertyRequest: async ({ city, district, description, propertyType, price, area }, { _id: callerId }) => {
    const matches = await AdServices.getMatchIds({ city, district, price, propertyType, area })

    const propertyRequest = await PropertyRequest.create({ city, district, description, propertyType, price, area, createdBy: callerId, matches })
    return propertyRequest
  }
}
