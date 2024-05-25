import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from '../config/swagger.js'
import appRouter from './router.js'
import { errorHandler } from './common/middlewares/error-handler.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(appRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(errorHandler)

export default app
