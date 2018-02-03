import express from 'express'
import { authRouter } from './authentication'
const router = express.Router()

// API V1 router entry
router.use('/auth', authRouter)

export { router as apiRouter }
