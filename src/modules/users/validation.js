import joi from 'joi'

export const UsersValidation = {
  login: {
    body: {
      phone: joi.string().trim().required(),
      password: joi.string().trim().required()
    }
  },

  getUsersStats: {
    query: {
      skip: joi.number().default(0),
      limit: joi.number().default(20)
    }
  }
}
