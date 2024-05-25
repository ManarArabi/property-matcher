import { tags } from '../../../../docs/tags.js'
import { CreateAdRequestSchema, CreateAdResponseSchema } from './schema.js'

export const AdsEndpointsDocs = {
  '/ads/': {
    post: {
      tags: [tags.ADS],
      description: 'Create new ad',
      security: [
        {
          jwtAuth: []
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: CreateAdRequestSchema
          }
        }
      },

      responses: {
        201: {
          description: 'Success',
          content: {
            'application/json': {
              schema: CreateAdResponseSchema
            }
          }
        },

        400: {
          description: 'Bad Request'
        },

        500: {
          description: 'Internal server error'
        }
      }
    }
  }
}
