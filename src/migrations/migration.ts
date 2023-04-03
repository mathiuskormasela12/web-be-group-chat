// ======= Migrations
// import all modules
import Database from '../core/Database'

const db = new Database()

db.sync()
  .then((message: string) => {
    console.log(message)
  })
  .catch((err) => {
    console.error(err.message)
  })
