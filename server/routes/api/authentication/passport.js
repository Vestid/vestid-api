const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const { verifyPW } = require('../../../helper')
// const app = require('../server');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, done) => {
      console.log('email: ', email)
      console.log('password: ', password)
      return done(null, email)

      // app.get('db').check_by_email([email]).then(user => {
      //     user = user[0];
      //     if(!user) return done(null, false)
      //     if(verifyPW(password, user.password)) return done(null, user);
      //     return done(null, false);
      // })
    }
  )
)

passport.serializeUser((user, done) => {
  console.log('serialize user: ', user)
  return done(null, user)
})

passport.deserializeUser((id, done) => {
  console.log('deserializeUser: ', id)

  // app.get('db').user_search_id([id]).then(response => {
  //     return done(null, response)
  // })
})

module.exports = passport
