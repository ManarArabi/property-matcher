import { Router } from 'express'
import UsersRouter from './modules/users/router.js'

const router = new Router()

router.use('/users', UsersRouter)

export default router
