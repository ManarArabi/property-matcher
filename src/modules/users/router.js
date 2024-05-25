import { Router } from 'express'
import { validateSchema } from '../../common/middlewares/joi.js'
import { usersValidation } from './validation.js'
import { userController } from './controller.js'

const router = Router()

router.post('/login', validateSchema(usersValidation.login), userController.login)

export default router
