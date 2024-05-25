import { AreaUnits } from '../constants/area.js'

export const areaSchema = {
  number: {
    type: Number,
    required: true
  },

  unit: {
    type: String,
    required: true,
    enum: Object.values(AreaUnits)
  }
}
