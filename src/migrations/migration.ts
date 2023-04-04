// ======= Migrations
// import all modules
import Database from '../core/Database'

const db = new Database()

db.sync()
  .then(() => {})
  .catch(() => {})
