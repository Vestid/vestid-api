const router = require('express').Router()
const passport = require('./passport')

router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/success'
  })
)

router.get('/success', (req, res, next) => {
  console.log('youre in the success function: ')
  res.end('youre successful!!!')
})

module.exports = router
