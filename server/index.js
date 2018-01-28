require('dotenv').config()
const cors = require('cors')
const express = require('express')
const massive = require('massive')
const bodyParser = require('body-parser')
const session = require('express-session')

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

//todo: look into moving sessions into it's own file

app.use(require('./routes'))

app.listen(app.get('port'), () =>
  console.log(`${process.env.PROJECT} running on `, app.get('port'))
)
