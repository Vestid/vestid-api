const router = require('express').Router()
const passport = require('./authentication/passport')

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/success'
// }))
// router.post('/login', (req, res, next) => {
//     res.end('fuck ya!!!')
// })

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/failed'
  })
)

router.get('/failed', () => console.log('you failed in passport'))
router.get('/', () => console.log('succssfully FUCK YA!'))

// router.get('/success', (req, res, next) => {
//     console.log('youre in the right fucking thing')
// })

// router.use("/login", require("./authentication/auth"));
// router.use('/success', require('./authentication/auth'))

module.exports = router
