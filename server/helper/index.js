const { compareSync } = require('bcryptjs')

exports.verifyPW = (submittedPW, userPW) => compareSync(submittedPW, userPW)
