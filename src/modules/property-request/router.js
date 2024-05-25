import { Router } from 'express'
import { validateSchema } from '../../common/middlewares/joi.js'
import { authenticate } from '../../common/middlewares/authenticate.js'
import { authorize } from '../../common/middlewares/authorize.js'
import { PropertyRequestAuthorization } from './authorization.js'
import { propertyRequestValidation } from './validation.js'
import { propertyRequestController } from './controller.js'

const router = Router()

router.post(
  '/',
  authenticate,
  authorize(PropertyRequestAuthorization.createPropertyRequest),
  validateSchema(propertyRequestValidation.createPropertyRequest),
  propertyRequestController.createPropertyRequest
)

export default router
