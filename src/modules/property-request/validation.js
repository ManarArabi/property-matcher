import joi from 'joi'
import { PriceCurrency } from '../../common/constants/price.js'
import { PropertyType } from '../../common/constants/property.js'
import { AreaUnits } from '../../common/constants/area.js'

export const propertyRequestValidation = {
  createPropertyRequest: {
    body: {
      city: joi.string().required(),
      district: joi.string().required(),
      description: joi.string().required(),
      propertyType: joi.string().valid(...Object.values(PropertyType)).required(),
      price: joi.object({
        amount: joi.number().required(),
        currency: joi.string().valid(...Object.values(PriceCurrency)).required()
      }).required().and('amount', 'currency'),

      area: joi.object({
        number: joi.number().required(),
        unit: joi.string().valid(...Object.values(AreaUnits)).required()
      }).required().and('number', 'unit')
    }
  }
}
