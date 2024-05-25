import { PriceCurrency } from '../constants/price.js'

export const PriceSchema = {
  amount: {
    type: Number,
    required: true
  },

  currency: {
    type: String,
    enum: Object.values(PriceCurrency),
    required: true
  }
}
