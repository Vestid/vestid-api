exports.loginUser = (req, res, next) => {
  // console.log(db.users)
  console.log('session: ', req.session)
  console.log('USER: ', req.user)
  res.end('nice job')
}
