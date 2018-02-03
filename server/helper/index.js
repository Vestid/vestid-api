import { compareSync } from 'bcryptjs'

exports.verifyPW = (submittedPW, userPW) => compareSync(submittedPW, userPW)
