require('dotenv').config()
const app = (module.exports = require('express')())
const db = require('./db')
const models = require('./models')
console.log('models: ', models)
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('./routes/api/authentication/passport')

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

// EXPRESS ROUTING ===========================
app.use(require('./routes'))

// CREATES SERVER & MONGODB CONNECTION ========================
app.on('db_connected', () =>
  app.listen(app.get('port'), () =>
    console.log(
      `Connected to MongoLab instance & ${process.env.PROJECT} running on`,
      app.get('port')
    )
  )
)
