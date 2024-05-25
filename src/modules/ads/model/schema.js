import mongoose from 'mongoose'
import { PropertyType } from '../../../common/constants/property.js'
import { PriceSchema } from '../../../common/schemas/price.js'
import { areaSchema } from '../../../common/schemas/area.js'
import { AdStatus } from './constants.js'

const adsSchema = new mongoose.Schema({
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

  status: {
    type: String,
    enum: Object.values(AdStatus),
    default: AdStatus.AVAILABLE,
    required: true
  },

  createdAt: {
    type: Date,
    default: new Date()
  }
})

export const Ads = mongoose.model('ads', adsSchema)
