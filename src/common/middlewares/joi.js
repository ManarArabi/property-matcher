import Joi from 'joi'
import _ from 'lodash'

export const validateSchema = (schema) => {
  const { query: querySchema = {}, body: bodySchema = {}, params: paramsSchema = {} } = schema

  const compiledParamsSchema = Joi.compile(paramsSchema)
  const compiledQuerySchema = Joi.compile(querySchema)
  const compiledBodySchema = Joi.compile(bodySchema)

  const validationOptions = { abortEarly: false }

  return (req, res, next) => {
    const { params, query, body } = req

    if (!_.isEmpty(querySchema)) {
      const { value: validatedQuery, error } = compiledQuerySchema.validate(query, validationOptions)

      if (!_.isNil(error)) {
        next(error)
        return
      }
      req.query = validatedQuery
    }

    if (!_.isEmpty(bodySchema)) {
      const { value: validatedBody, error } = compiledBodySchema.validate(body, validationOptions)

      if (!_.isNil(error)) {
        next(error)
        return
      }
      req.body = validatedBody
    }

    if (!_.isEmpty(paramsSchema)) {
      const { value: validatedParams, error } = compiledParamsSchema.validate(params, validationOptions)

      if (!_.isNil(error)) {
        next(error)
        return
      }
      req.params = validatedParams
    }

    next()
  }
}
