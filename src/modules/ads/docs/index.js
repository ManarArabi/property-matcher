import { tags } from '../../../../docs/tags.js'
import { PaginationLimitParam } from '../../../common/swagger/parameters.js'
import { AdIdParameter } from './parameters.js'
import { CreateAdRequestSchema, CreateAdResponseSchema, GetAdPropertyRequestMatchesResponseSchema } from './schema.js'

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
  },

  '/ads/{id}/property-requests/matches': {
    get: {
      tags: [tags.ADS],
      description: 'It gets a list of property requests that matches the provided id sorted by refreshedAt',
      security: [
        {
          jwtAuth: []
        }
      ],
      parameters: [AdIdParameter, PaginationLimitParam, PaginationLimitParam],

      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: GetAdPropertyRequestMatchesResponseSchema
            }
          }
        },

        400: {
          description: 'Bad Request'
        },

        404: {
          description: 'there is no ad with this id'
        },

        422: {
          description: 'this ad is expired'
        },

        500: {
          description: 'Internal server error'
        }
      }
    }
  }
}
