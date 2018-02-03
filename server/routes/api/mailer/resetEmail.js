const { SENDGRID_API, SENDGRID_EMAIL } = process.env
import db from 'mongoose'
import sendgrid from '@sendgrid/mail'
sendgrid.setApiKey(`${SENDGRID_API}`)

exports.resetPasswordEmail = (req, res, next) => {
  const { hostname } = req
  const { email, password } = req.body

  console.log('email: ', email)
  console.log('password: ', password)

  const url = `http://${hostname}/api/reset-approved`

  const msg = {
    to: 'vestid.email@gmail.com',
    from: SENDGRID_EMAIL,
    subject: 'Vestid Support: Password Reset Request',
    text: `Hi Dallin,
         you are getting this email because you have requested to reset your password by clicking: ${url}
         in 24 hours this link will no longer allow you to reset your password.`
  }
  sendgrid.send(msg)
  res.status(200).send('nice work')
}
