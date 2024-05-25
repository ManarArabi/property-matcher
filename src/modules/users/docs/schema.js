export const LoginRequestBodySchema = {
  type: 'object',
  properties: {
    phone: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['phone', 'password']
}

export const LoginReturnBodySchema = {
  type: 'object',
  properties: {
    jwt: { type: 'string' }
  },
  required: ['jwt']
}
