require('dotenv').config()
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('./routes/api/authentication/passport')
const mongoose = require('./db')

const app = (module.exports = express())
app.set('port', process.env.PORT || 3030)

app.use(cors())
app.use(bodyParser.json())

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(require('./routes'))
app.listen(app.get('port'), mongoose =>
  console.log(`${process.env.PROJECT} running on `, app.get('port'))
)
