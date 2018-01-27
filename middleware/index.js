const app = require('../server');
const { parse, isPast } = require('date-fns')
const random = require('rand-token')

exports.checkAuthed = (req, res, next) => {
	return (!req.isAuthenticated()) ? res.status(401).send("Unauthorized") : next()
};

exports.checkEmail = (req, res, next) => {
    const { email } = req.body;
    app.get('db').check_by_email([email]).then(exists => {
        (exists.length > 0) ? delete exists[0].password : res.status(404).send('Not finding that email');
        req.body.confirmed = exists;
        next()
    })
}

exports.createExpiration = (now = new Date()) => (parse(now.setDate(now.getDate() + 1)))
//todo needs to check have conditionals for how many days are in the given month.
exports.hasTokenExpired = date => (isPast(date))

exports.updateUserToken = (req, res, next) => {
    const { id } = req.body.confirmed[0]
    const token = random.generate(25)
    const expiration = exports.createExpiration()

    app.get('db').update_user_token([token, expiration, id]).then(updated => {
        (updated[0].tokenkey) ? delete updated[0].password : res.status(404).send('Reset password failed')
        req.body.token = { token }
        next()
    })
}

exports.checkToken = (req, res, next) => {
    const { token } = req.params

    app.get('db').find_user_token([token]).then(user => {
        (user.length > 0) ? delete user[0].password : res.status(404).send('Reset password failed')
        return (!exports.hasTokenExpired(parse(user[0].expiration))) ? res.status(200).send('working') : res.status(404).send('Token has expired')
    })
}

exports.checkLoanExists = (req, res, next) => {
    let url = new RegExp('/add-loan/', 'gi');
    // const { id } = req.user[0];
    // console.log('id: ', id)
    const { originalUrl } = req;
    // console.log('originalURL: ', originalUrl);
    // console.log('checking: ', url.exec(originalUrl))
    // let table = (url.exec(originalUrl)) ? 'offering_loans' : 'seeking_loans'
    // console.log('table: ', table)
    console.log('connection: ', app.get('db').check_loan_exits)
    // console.log('passed: ', ['offering_loans', 1])
    app.get('db').check_loan_exits(['offering_loans', 1]).then(userLoans => {
        console.log('userLoans: ', userLoans);

        // return (userLoans.length > 0) ? res.status(200).send('User already has a loan submitted') : next()
    }).catch(err => console.log('check_loan_exists error: ', err))
}

exports.addLoanOffering = (req, res, next) => {
    const { id } = req.user[0];
    const { location } = req.body
    const { type } = req.body.businesstype;
    app.get('db').add_loan_offering([id, location, type]).then(loans => {
        return (loans.length > 0 ) ? res.status(200).send('Thank you for submitting a loan offer')
            : res.status(500).send('Issue submitting your loan offer, please try again later.')
    })
}

exports.addSeekingLoan = (req, res, next) => {

}