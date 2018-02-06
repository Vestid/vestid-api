import { removeUserInfo } from '../../../helper'

exports.loginUser = ({ user }, res, next) =>
  !user
    ? res.status(404).send('user not found')
    : res.status(200).send(removeUserInfo(user))
