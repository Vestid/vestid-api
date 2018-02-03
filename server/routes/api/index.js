const router = require('express').Router()

// API V1 router entry
router.use('/auth', require('./authentication'))

module.exports = router
