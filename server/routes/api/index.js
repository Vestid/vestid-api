const router = require('express').Router()

router.use('/login', require('./authentication/auth'))
router.use('/success', require('./authentication/auth'))

module.exports = router
