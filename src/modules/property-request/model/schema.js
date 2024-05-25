import mongoose from 'mongoose'
import { PropertyType } from '../../../common/constants/property.js'
import { PriceSchema } from '../../../common/schemas/price.js'
import { areaSchema } from '../../../common/schemas/area.js'

const propertyRequestSchema = new mongoose.Schema({
  price: PriceSchema,
  area: areaSchema,
  city: {
    type: String,
    required: true
  },

  district: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  propertyType: {
    type: String,
    required: true,
    enum: Object.values(PropertyType)
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },

  refreshedAt: {
    type: Date,
    default: null
  },

  createdAt: {
    type: Date,
    default: new Date()
  },

  matches: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ads' }],
    default: [],
    required: true
  }
})

propertyRequestSchema.index({
  city: 1,
  district: 1,
  propertyType: 1
})

export const PropertyRequest = mongoose.model('property-request', propertyRequestSchema)
