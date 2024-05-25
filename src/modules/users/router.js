import { Router } from 'express'
import { validateSchema } from '../../common/middlewares/joi.js'
import { UsersValidation } from './validation.js'
import { userController as UserController } from './controller.js'

const router = Router()

router.post('/login', validateSchema(UsersValidation.login), UserController.login)

export default router
