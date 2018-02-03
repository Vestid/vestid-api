const app = require('../../../')

exports.loginUser = (req, res, next) => {
  console.log('session: ', req.session)
  console.log('USER: ', req.user)
  console.log('db: ', app.get('db'))
  res.end('Nice job')
}
