import { loginUser } from './login'
import { resetPw } from './resetPw'
import passport from 'passport'
import express from 'express'
import { checkAuthed } from '../../../middleware/'

const router = express.Router()

router.post('/login', passport.authenticate('local'), checkAuthed, loginUser)
router.get('/reset-approved/:token', resetPw)

export { router as authRouter }
