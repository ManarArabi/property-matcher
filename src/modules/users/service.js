import { generateJwt } from '../../common/utils/password.js'
import { Users } from './model/schema.js'
import bcrypt from 'bcrypt'
import HttpError from '../../common/http-error.js'
import _ from 'lodash'
import httpStatus from 'http-status'

const { NOT_FOUND, UNAUTHORIZED } = httpStatus

export const UserServices = {
  /**
   * It returns jwt if the provided phone and password are valid
   *
   * @param {Object} args
   * @param {String} args.phone
   * @param {String} args.password
   *
   * @returns {Promise<String>}
   */
  login: async ({ phone, password }) => {
    const user = await Users.findOne({ phone }, { password: 1, name: 1, role: 1, phone: 1 }).lean()

    if (_.isNil(user)) {
      throw new HttpError({ status: NOT_FOUND, message: 'there is no user with this number' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new HttpError({ status: UNAUTHORIZED, message: 'Wrong password' })
    }

    const { password: hashedPassword, ...userData } = user

    const jwt = await generateJwt({ data: userData })
    return jwt
  },

  /**
   * It gets users stats
   * @param {Object} args
   * @param {Number} [args.limit = 20]
   * @param {Number} [args.skip =0]
   *
   */
  getUsersStats: async ({ skip = 0, limit = 20 } = {}) => {
    const [usersStats, usersCount] = await Promise.all([
      Users.aggregate([
        {
          $lookup: {
            from: 'ads',
            localField: '_id',
            foreignField: 'createdBy',
            as: 'ads'
          }
        },
        {
          $lookup: {
            from: 'property-requests',
            localField: '_id',
            foreignField: 'createdBy',
            as: 'propertyRequests'
          }
        },
        {
          $addFields: {
            adsCount: { $size: '$ads' },
            requestsCount: {
              $size: '$propertyRequests'
            }
          }
        },
        {
          $unwind: {
            path: '$ads',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $unwind: {
            path: '$propertyRequests',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            phone: { $first: '$phone' },
            role: { $first: '$role' },
            status: { $first: '$status' },
            adsCount: { $first: '$adsCount' },
            requestsCount: {
              $first: '$requestsCount'
            },
            totalAdsAmount: {
              $sum: '$ads.price.amount'
            },
            totalRequestsAmount: {
              $sum: '$propertyRequests.price.amount'
            }
          }
        },
        {
          $skip: skip
        },
        {
          $limit: limit
        }
      ]),

      Users.countDocuments()
    ])

    return {
      data: usersStats,
      total: usersCount,
      page: skip === 0 ? 0 : limit / skip,
      limit,
      hasNextPage: usersCount - (skip + limit) > 0,
      hasPreviousPage: skip !== 0
    }
  }
}
