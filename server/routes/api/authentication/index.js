import { loginUser } from './login'
import { resetPw } from './resetPw'
import passport from 'passport'
import express from 'express'

const router = express.Router()

router.post('/login', passport.authenticate('local'), loginUser)
router.get('/reset-approved/:token', resetPw)
// router.get('/test', (req, res, next) => {

// })

export { router as authRouter }
