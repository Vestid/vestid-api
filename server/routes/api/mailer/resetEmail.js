const { SENDGRID_API, SENDGRID_EMAIL } = process.env
import db from 'mongoose'
import sendgrid from '@sendgrid/mail'
import random from 'rand-token'
sendgrid.setApiKey(`${SENDGRID_API}`)

exports.resetPasswordEmail = (req, res, next) => {
  const { hostname } = req
  const token = random.generate(15)
  //   const url = `http://${hostname}:3030/api/v1/auth/reset-approved/${token}`
  const url = `http://${hostname}/api/v1/auth/reset-approved/${token}`

  const msg = {
    to: 'vestid.email@gmail.com',
    from: SENDGRID_EMAIL,
    subject: 'Vestid Support: Password Reset Request',
    text: `Hi Dallin,
         you are getting this email because you have requested to reset your password by clicking: ${url}
         in 24 hours this link will no longer allow you to reset your password.`
  }
  sendgrid
    .send(msg)
    .then(success => res.status(202).send('success'))
    .catch(err => console.log('sendgrid error: ', err))
}
