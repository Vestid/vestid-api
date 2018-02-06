exports.resetPw = (req, res, next) => {
  const { token } = req.params
  res.end(token)
}
