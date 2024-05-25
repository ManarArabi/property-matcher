import { AdStatus } from './model/constants.js'
import { Ads } from './model/schema.js'
import _ from 'lodash'
import httpStatus from 'http-status'
import { PropertyRequest } from '../property-request/model/schema.js'
import HttpError from '../../common/http-error.js'
import { UserRoles } from '../users/model/constants.js'

const { NOT_FOUND, UNPROCESSABLE_ENTITY, FORBIDDEN } = httpStatus

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
  getMatchedAdIds: async ({ city, district, propertyType, price, area }) => {
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
  },

  /**
   * It gets ad matched property requests
   *
   * @param {Object} args
   * @param {String} args.adId
   *
   * @param {Object} paginationParams
   * @param {Number} [paginationParams.skip = 0]
   * @param {Number} [paginationParams.limit = 20]
   *
   * @param {Object} callerData
   * @param {String} callerData.callerId
   * @param {String} callerData.callerRole
   *
   * @returns {Promise<PropertyRequest[]>}
   */
  getAdsPropertyRequestsMatches: async ({ adId }, { skip = 0, limit = 20 } = {}, { callerId, callerRole }) => {
    const ad = await Ads.findOne({ _id: adId }).lean()
    if (_.isNil(ad)) {
      throw new HttpError({ status: NOT_FOUND, message: 'there is no ad with this id' })
    }

    if (ad.status === AdStatus.EXPIRED) {
      throw new HttpError({ status: UNPROCESSABLE_ENTITY, message: 'this ad is expired' })
    }

    if (callerRole === UserRoles.AGENT && String(ad.createdBy) !== callerId ) {
      throw new HttpError({ status: FORBIDDEN, message: 'You are not allowed to do this action'})
    }

    const propertyRequests = await PropertyRequest.aggregate([
      {
        $match: {
          city: ad.city,
          district: ad.district,
          propertyType: ad.propertyType,
          'price.amount': { $lte: ad.price.amount + (ad.price.amount * 0.1), $gte: ad.price.amount - (ad.price.amount * 0.1) },
          'price.currency': ad.price.currency,
          'area.number': { $lte: ad.area.number + (ad.area.number * 0.1), $gte: ad.area.number - (ad.area.number * 0.1) },
          'area.unit': ad.area.unit
        }
      },

      {
        $sort: { refreshedAt: -1 }
      },

      {
        $skip: skip
      },

      {
        $limit: limit
      }
    ])

    return propertyRequests
  }
}
