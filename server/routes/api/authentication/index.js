const router = require('express').Router()
const { loginUser } = require('./login')
const passport = require('./passport')

router.post('/login', passport.authenticate('local'), loginUser)

module.exports = router
