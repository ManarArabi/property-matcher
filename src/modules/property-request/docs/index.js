import { tags } from '../../../../docs/tags.js'
import { PropertyRequestIdParameter } from './parameters.js'
import { CreatePropertyRequestBodySchema, CreatePropertyRequestReturnSchema, UpdatePropertyRequestBodySchema } from './schema.js'

export const PropertyRequestEndpointsDocs = {
  '/property-requests/': {
    post: {
      tags: [tags.PROPERTY_REQUEST],
      description: 'Create new property request',
      security: [
        {
          jwtAuth: []
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: CreatePropertyRequestBodySchema
          }
        }
      },

      responses: {
        201: {
          description: 'Success',
          content: {
            'application/json': {
              schema: CreatePropertyRequestReturnSchema
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

  '/property-requests/{id}': {
    patch: {
      tags: [tags.PROPERTY_REQUEST],
      description: 'Updates property request',
      security: [
        {
          jwtAuth: []
        }
      ],
      parameters: [PropertyRequestIdParameter],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: UpdatePropertyRequestBodySchema
          }
        }
      },

      responses: {
        204: {
          description: 'Successful Update'
        },

        400: {
          description: 'Bad Request'
        },

        403: {
          description: 'Forbidden'
        },

        404: {
          description: 'Property request not found'
        },

        500: {
          description: 'Internal server error'
        }
      }
    }
  }
}
