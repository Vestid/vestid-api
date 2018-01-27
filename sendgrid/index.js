require('dotenv').config()
const { SENDGRID_API, SENDGRID_EMAIL } = process.env;
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(`${SENDGRID_API}`);
const { generateToken, mashName } = require('../middleware/index')

exports.sendReset = (req, res, next) => {
    const { firstname, email } = req.body.confirmed[0]
    const { token } = req.body.token
    const { hostname } = req
    // const url = 'vestid.co/reset/approved/'
    const url = `http://${hostname}/api/reset-approved/${token}`
    const msg = {
        to: email,
        from: SENDGRID_EMAIL,
        subject: 'Vestid Support: Password Reset Request',
        text:`Hi ${firstname},
         you are getting this email because you have requested to reset your password by clicking: ${url}
         in 24 hours this link will no longer allow you to reset your password.`
    };
    sendgrid.send(msg);
};