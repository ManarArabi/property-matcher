import Joi from 'joi'

export const usersValidation = {
  login: {
    body: {
      phone: Joi.string().trim().required(),
      password: Joi.string().trim().required()
    }
  }
}
