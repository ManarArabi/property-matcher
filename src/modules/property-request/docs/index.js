import { tags } from "../../../../docs/tags.js";
import { CreatePropertyRequestBodySchema, CreatePropertyRequestReturnSchema } from "./schema.js";

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
  }
}