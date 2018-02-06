import { compareSync } from 'bcryptjs'

exports.verifyPW = (submittedPW, userPW) => compareSync(submittedPW, userPW)

exports.removeUserInfo = ({ id, firstname, lastname } = {}) => ({
  id,
  firstname,
  lastname
})
