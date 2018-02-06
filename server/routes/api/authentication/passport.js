import app from '../../../'
import passport from 'passport'
import Strategy from 'passport-local'
import { verifyPW } from '../../../helper'
const LocalStrategy = Strategy

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    (email, _password, done) => {
      app
        .get('db')
        .users.findOne({ email })
        .then(user => {
          const { password } = user
          return verifyPW(_password, password)
            ? done(null, user)
            : done(null, false)
        })
        .catch(err => done(err))
    }
  )
)

passport.serializeUser(({ id }, done) => don(null, id))

passport.deserializeUser((id, done) => {
  app
    .get('db')
    .users.findOne(id)
    .then(user => done(null, users))
    .catch(err => done(err))
})

export default passport
