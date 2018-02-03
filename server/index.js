import db from './db'
import cors from 'cors'
import express from 'express'
import router from './routes'
import {} from 'dotenv/config'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from './routes/api/authentication/passport'

const { PORT, PROJECT, SESSION_SECRET } = process.env
const app = express()

app.set('port', PORT || 3030)

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

// CREATES SERVER & MONGODB CONNECTION ========================
app.on('db_connected', () =>
  app.listen(app.get('port'), () =>
    console.log(
      `Connected to MongoLab instance & ${PROJECT} running on`,
      app.get('port')
    )
  )
)

export default app
