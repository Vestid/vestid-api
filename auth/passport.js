const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const app = require('../server');

const verifyPW = (submittedPW, userPW) => {
  return bcrypt.compareSync(submittedPW, userPW);
};

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
		app.get('db').check_by_email([email]).then(user => {
	    user = user[0];
	    if(!user) return done(null, false)
	    if(verifyPW(password, user.password)) return done(null, user);
	    return done(null, false);
    })
}))

passport.serializeUser((user, done) =>{
 return done(null, user.id);
});

passport.deserializeUser((id, done) => {
	app.get('db').user_search_id([id]).then(response => {
		return done(null, response)
	})
});

module.exports = passport;