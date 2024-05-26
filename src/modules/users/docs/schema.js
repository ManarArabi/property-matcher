import { UserRoles, UserStatus } from '../model/constants.js'

export const LoginRequestBodySchema = {
  type: 'object',
  properties: {
    phone: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['phone', 'password']
}

export const LoginReturnBodySchema = {
  type: 'object',
  properties: {
    jwt: { type: 'string' }
  },
  required: ['jwt']
}

export const GetUsersStatsResponseSchema = {
  type: 'object',
  properties: {
    page: { type: 'number' },
    limit: { type: 'number' },
    total: { type: 'number' },
    hasNextPage: { type: 'boolean' },
    hasPreviousPage: { type: 'boolean' },
    data: {
      type: 'array',
      items: {
        name: { type: 'string' },
        phone: { type: 'string' },
        role: { type: 'string', enum: Object.values(UserRoles) },
        status: { type: 'string', enum: Object.values(UserStatus) },
        adsCount: { type: 'number' },
        requestsCount: { type: 'number' },
        totalAdsAmount: { type: 'number' },
        totalRequestAmount: { type: 'number' }
      }
    }
  }
}
