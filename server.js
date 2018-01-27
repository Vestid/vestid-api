require('dotenv').config()
const cors = require('cors')
const path = require('path')
const express = require('express')
const massive = require('massive')
const bodyParser = require('body-parser')
const session = require('express-session')
const projectname = 'Vestid'


// INITIATE EXPRESS APP & SET LISTENING PORT ================
const app = module.exports = express()
app.set('port', process.env.PORT || 3000)

// MIDDLEWARE FOR EVERYTHING TO PASS THROUGH ================
app.use(bodyParser.json())
app.use(express.static(`${__dirname}./../public`))
app.use(cors());

// PASSPORT STRATEGY ===================================
const passport = require('./auth/passport')

// MASSIVE DB ==========================================
massive(process.env.ESQL_DB)
    .then(db => app.set('db', db))
    .catch((err) => console.log("massive DB Error: ", err))

// MIDDLEWARE POLICY ===================================
const { checkAuthed, checkEmail, updateUserToken, checkToken, checkLoanExists, addLoanOffering } = require('./middleware')

// EXPRESS SESSIONS =====================================
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize())
app.use(passport.session())

// SERVER CONTROLLERS ==================================
const { registerUser, successUser } = require('./controllers/userCtrl');
const { sendReset } = require('./sendgrid');


// LOCAL AUTH ENDPOINTS ================================
app.post('/api/login', passport.authenticate('local', {
    successRedirect: '/success',
}));
app.get('/success', checkAuthed, successUser)
app.get('/api/current-user', checkAuthed)
app.post('/api/register', registerUser)
// PASSWORD RESET ENDPOINTS ============================
app.post('/api/reset', checkEmail, updateUserToken, sendReset)
app.get('/api/reset-approved/:token', checkToken)
// LOAN ENDPOINTS =========================================
app.post('/api/add-loan', checkLoanExists, addLoanOffering)
app.post('/api/add-seeking-loan', (req, res, next) => {
    console.log('add-seeking loan: ', req.body);
//check email first, set the boolean on user table
    //input into seeking_loan table
})
app.get('/api/get-all-loans', (req, res, next) => {
    //todo: this will be the all-loans frontend page, check login status
})

// LISTENING ON PORT =====================================
app.listen(app.get('port'), () => {
    console.log(`${projectname} is running on`, app.get('port'));
});
