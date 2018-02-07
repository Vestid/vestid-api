import cors from 'cors'
import Raven from 'raven'
import express from 'express'
import router from './routes'
import {} from 'dotenv/config'
import massive from './massive_db'
import bodyParser from 'body-parser'
import session from 'express-session'
import errorHandling from './errorHandling'
import passport from './routes/api/authentication/passport'

const { PORT, PROJECT, SESSION_SECRET, SENTRY_DNS } = process.env
const app = express()

Raven.config(SENTRY_DNS).install()

app.set('port', PORT || 3030)

app.use(Raven.requestHandler())

app.use(cors())
app.use(bodyParser.json())

app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

// EXPRESS ROUTING ===========================
app.use(router)

// SENTRY ERROR HANDLING ======================
app.use(Raven.errorHandler())
app.use(errorHandling)
process.setMaxListeners(0)

// CREATES SERVER & MONGODB CONNECTION ========================
app.on('db_connected', connection => {
  app.set('db', connection)
  app.listen(app.get('port'), () =>
    console.log(
      `Postgres DB connected & ${PROJECT} running on`,
      app.get('port')
    )
  )
})

export default app
