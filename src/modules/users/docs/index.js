import { tags } from '../../../../docs/tags.js'
import { LoginRequestBodySchema, LoginReturnBodySchema } from './schema.js'

export const UsersEndpoints = {
  '/users/login': {
    post: {
      tags: [tags.USERS],
      description: 'Login users',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: LoginRequestBodySchema
          }
        }
      },

      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: LoginReturnBodySchema
            }
          }
        },

        400: {
          description: 'Bad Request'
        },

        401: {
          description: 'Invalid password'
        },

        404: {
          description: 'Provided number is not found'
        },

        500: {
          description: 'Internal server error'
        }
      }
    }
  }
}
