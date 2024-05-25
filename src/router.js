import { Router } from 'express'
import UsersRouter from './modules/users/router.js'
import AdsRouter from './modules/ads/router.js'
import PropertyRequestRouter from './modules/property-request/router.js'

const router = new Router()

router.use('/users', UsersRouter)
router.use('/ads', AdsRouter)
router.use('/property-requests', PropertyRequestRouter)

export default router
