import Raven from 'raven'

export default (err, req, res, next) => {
  Raven.captureMessage(err)
  res.status(404).send(err)
}
