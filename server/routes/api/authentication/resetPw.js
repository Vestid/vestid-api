exports.resetPw = (req, res, next) => {
  const { token } = req.params
  console.log('response token: ', token)
  res.end(token)
}
