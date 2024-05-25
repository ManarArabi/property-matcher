import { Router } from 'express'
import { validateSchema } from '../../common/middlewares/joi.js'
import { AdsValidations } from './validation.js'
import { AdsController } from './controller.js'
import { authenticate } from '../../common/middlewares/authenticate.js'
import { authorize } from '../../common/middlewares/authorize.js'
import { AdsAuthorization } from './authorization.js'

const router = Router()

router.post(
  '/',
  authenticate,
  authorize(AdsAuthorization.createAd),
  validateSchema(AdsValidations.createAd),
  AdsController.createAd
)

router.get(
  '/:id/property-requests/matches',
  authenticate,
  authorize(AdsAuthorization.getAdPropertyRequestsMatches),
  validateSchema(AdsValidations.getAdPropertyRequests),
  AdsController.getAdPropertyRequestMatches
)

export default router
