import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from '../config/swagger.js'

dotenv.config()

const app = express()

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default app
