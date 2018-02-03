import { loginUser } from './login'
import passport from './passport'
import express from 'express'

const router = express.Router()

router.post('/login', passport.authenticate('local'), loginUser)

export { router as authRouter }
