const router = require('express').Router()
const passport = require('./authentication/passport')
console.log(passport.authenticate)

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/success'
// }))
// router.get('/success', (req, res, next) => {
//     console.log('youre in the right fucking thing')
// })
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  console.log('request after: ', req.body)
})

router.get('/failed', () => console.log('you failed in passport'))
router.get('/', () => console.log('succssfully used passport!'))

// router.use("/login", require("./authentication/auth"));
// router.use('/success', require('./authentication/auth'))

module.exports = router
