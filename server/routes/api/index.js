import express from 'express'
import { authRouter } from './authentication'
import { emailRouter } from './mailer'
const router = express.Router()

// API V1 router entry
router.use('/auth', authRouter)
router.use('/email', emailRouter)

export { router as apiRouter }
