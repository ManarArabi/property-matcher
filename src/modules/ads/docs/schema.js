import { AreaUnits } from '../../../common/constants/area.js'
import { PriceCurrency } from '../../../common/constants/price.js'
import { PropertyType } from '../../../common/constants/property.js'

export const CreateAdRequestSchema = {
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

export const CreateAdResponseSchema = {}
