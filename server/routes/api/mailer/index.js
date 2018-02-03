import express from 'express'
import { resetPasswordEmail } from './resetEmail'

const router = express.Router()

router.post('/reset-password', resetPasswordEmail)

export { router as emailRouter }
