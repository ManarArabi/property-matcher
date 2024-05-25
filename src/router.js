import { Router } from 'express'
import UsersRouter from './modules/users/router.js'
import AdsRouter from './modules/ads/router.js'

const router = new Router()

router.use('/users', UsersRouter)
router.use('/ads', AdsRouter)

export default router
