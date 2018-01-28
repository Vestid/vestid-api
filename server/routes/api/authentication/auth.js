const router = require('express').Router()
const passport = require('./passport')

// router.post(
//   '/',
//   passport.authenticate('local', {
//     successRedirect: '/success'
//   }), (req, res) => res.redirect('/success')
// )

router.post('/success', (req, res, next) => {
  console.log('youre in the success function: ')
  res.end('youre successful!!!')
})

module.exports = router
