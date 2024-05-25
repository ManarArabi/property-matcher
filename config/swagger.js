import { config } from 'dotenv'
import { moduleEndpointsDocumentation } from '../docs/index.js'
import { tags } from '../docs/tags.js'

config()

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Property Matcher Endpoints Documentation'
  },
  host: `localhost:${process.env.PORT || 3000}`,
  basePath: '/',
  tags: Object.values(tags),
  paths: moduleEndpointsDocumentation,
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  components: {
    securitySchemes: {
      jwtAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token in the format: Bearer <token>'
      }
    }
  }
}
