import { Router } from 'express'
import { validateSchema } from '../../common/middlewares/joi.js'
import { UsersValidation } from './validation.js'
import { userController as UserController } from './controller.js'
import { authenticate } from '../../common/middlewares/authenticate.js'
import { authorize } from '../../common/middlewares/authorize.js'
import { UsersAuthorization } from './authorization.js'

const router = Router()

router.post('/login', validateSchema(UsersValidation.login), UserController.login)
router.get(
  '/stats',
  authenticate,
  authorize(UsersAuthorization.getUsersStats),
  validateSchema(UsersValidation.getUsersStats),
  UserController.getUsersStats
)

export default router
