import {} from 'dotenv/config'
import db from 'mongoose'
import app from '../'

db.Promise = global.Promise
db.connect(process.env.MONGO_URI)
db.connection
  .once('open', () => app.emit('db_connected'))
  .on('error', error => console.log('Error connecting to MongoLab: ', error))

module.exports = db
