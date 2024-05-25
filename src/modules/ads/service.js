import { AdStatus } from './model/constants.js'
import { Ads } from './model/schema.js'

export const AdServices = {
  /**
   * It creates add with the provided properties
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
   * @returns {Promise<Ad>}
   */
  createAd: async ({ city, district, description, propertyType, price, area }, { _id: callerId }) => {
    const ad = await Ads.create({ city, district, description, propertyType, price, area, createdBy: callerId, status: AdStatus.AVAILABLE })

    return ad
  }
}
