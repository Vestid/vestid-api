require('dotenv').config()
const cors = require('cors')
const express = require('express')
const massive = require('massive')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('./routes/api/authentication/passport')

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

//todo: look into moving sessions into it's own file

app.use(require('./routes'))

app.listen(app.get('port'), () =>
  console.log(`${process.env.PROJECT} running on `, app.get('port'))
)
