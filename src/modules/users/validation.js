import Joi from 'joi'

export const UsersValidation = {
  login: {
    body: {
      phone: Joi.string().trim().required(),
      password: Joi.string().trim().required()
    }
  }
}
