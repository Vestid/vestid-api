import {} from 'dotenv/config'
import massive from 'massive'
import app from '../'

const { ESQL_DB } = process.env

massive(ESQL_DB)
  .then(db => {
    app.set('db', db)
    app.emit('db_connected')
  })
  .catch(err => console.log('error connecting db: ', err))

export default massive
