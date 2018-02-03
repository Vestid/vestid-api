import db from 'mongoose'
const Schema = db.Schema

const UserSchema = new Schema({
  email: String,
  password: String
})

// const Users = (module.exports = db.model('users', UserSchema))
db.model('users', UserSchema)
