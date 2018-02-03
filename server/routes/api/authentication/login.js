exports.loginUser = (req, res, next) => {
  console.log('session: ', req.session)
  console.log('USER: ', req.user)
  res.end('Nice job')
}
