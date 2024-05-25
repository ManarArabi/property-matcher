import { AreaUnits } from '../../../common/constants/area.js'
import { PriceCurrency } from '../../../common/constants/price.js'
import { PropertyType } from '../../../common/constants/property.js'

export const CreatePropertyRequestBodySchema = {
  type: 'object',
  properties: {
    city: { type: 'string' },
    district: { type: 'string' },
    description: { type: 'string' },
    propertyType: { type: 'string', enum: Object.values(PropertyType) },
    price: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        currency: { type: 'string', enum: Object.values(PriceCurrency) }
      },
      required: ['amount', 'currency']
    },

    area: {
      type: 'object',
      properties: {
        number: { type: 'number' },
        unit: { type: 'string', enum: Object.values(AreaUnits) }
      },
      required: ['number', 'unit']
    }
  },

  required: ['city', 'district', 'description', 'propertyType', 'price', 'area']
}

export const CreatePropertyRequestReturnSchema = {
  type: 'object',
  properties: {
    city: { type: 'string' },
    district: { type: 'string' },
    description: { type: 'string' },
    propertyType: { type: 'string', enum: Object.values(PropertyType) },
    price: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        currency: { type: 'string', enum: Object.values(PriceCurrency) }
      },
      required: ['amount', 'currency']
    },

    area: {
      type: 'object',
      properties: {
        number: { type: 'number' },
        unit: { type: 'string', enum: Object.values(AreaUnits) }
      },
      required: ['number', 'unit']
    },

    _id: { type: 'string' },
    refreshedAt: { type: 'date' },
    createdAt: { type: 'date' },
    createdBy: { type: 'string' },

    matches: {
      type: 'array',
      items: {
        type: 'String'
      }
    }
  },

  required: ['city', 'district', 'description', 'propertyType', 'price', 'area', '_id', 'matches', 'createdAt', 'createdBy', 'refreshedAt']
}

export const UpdatePropertyRequestBodySchema = {
  type: 'object',
  properties: {
    description: { type: 'string' },
    price: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        currency: { type: 'string', enum: Object.values(PriceCurrency) }
      },
      required: ['amount', 'currency']
    },

    area: {
      type: 'object',
      properties: {
        number: { type: 'number' },
        unit: { type: 'string', enum: Object.values(AreaUnits) }
      },
      required: ['number', 'unit']
    }
  }
}
