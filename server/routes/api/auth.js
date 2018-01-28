const router = require('express').Router()
console.log('router: ', router)

router.get('/', (req, res, next) => {
  console.log('params: ', req.params)
  res.end('hello world')
})

router.post('/', (req, res, next) => {
  res.end('hello from the post')
})
module.exports = router
