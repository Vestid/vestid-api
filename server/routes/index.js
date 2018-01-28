const router = require('express').Router()

router.use('/api', require('./api'))
// router.use('/success', (req, res, next) => {
//     console.log('youve made it to the success function')
// })

module.exports = router
