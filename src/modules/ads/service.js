import { AdStatus } from './model/constants.js'
import { Ads } from './model/schema.js'

export const AdServices = {
  /**
   * It creates ad with the provided properties
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
  },

  /**
   * It gets ads Ids that matches the provided parameters
   *
   * @param {Object} args
   * @param {String} args.city
   * @param {String} args.district
   * @param {String} args.propertyType
   * @param {Object} args.price
   * @param {number} args.price.amount
   * @param {String} args.price.currency
   * @param {Object} args.area
   * @param {number} args.area.number
   * @param {String} args.area.unit
   *
   * @returns {Promise<mongoose.Types.ObjectId[]>}
   */
  getMatchIds: async ({ city, district, propertyType, price, area }) => {
    const matchesPayload = {
      city,
      district,
      propertyType,
      'price.amount': { $lte: price.amount + (price.amount * 0.1), $gte: price.amount - (price.amount * 0.1) },
      'price.currency': price.currency,
      'area.number': { $lte: area.number + (area.number * 0.1), $gte: area.number - (area.number * 0.1) },
      'area.unit': area.unit,
      status: AdStatus.AVAILABLE
    }

    const matches = await Ads.distinct('_id', matchesPayload)

    return matches
  }
}
