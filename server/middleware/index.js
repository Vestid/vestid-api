exports.checkAuthed = (req, res, next) => {
  return !req.isAuthenticated() ? res.status(401).send('Unauthorized') : next()
}
