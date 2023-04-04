// ========== Database
// import all modules
import mysql, { type QueryError, type Connection } from 'mysql2'
import config from '../config'

class Database {
  public async createDatabase (): Promise<string> {
    const db = mysql.createConnection({
      host: config?.database?.host,
      user: config?.database?.user,
      password: config?.database?.password
    })

    return new Promise((resolve, reject) => {
      const sql: string = `CREATE DATABASE IF NOT EXISTS \`${config?.database?.name ?? 'test'}\` CHARACTER SET utf8 COLLATE utf8_general_ci;`
      db.query(sql, (err: QueryError) => {
        if (err !== null) {
          db.destroy()
          reject(err)
        } else {
          db.destroy()
          resolve('The database has been created')
        }
      })
    })
  }

  public async createTables (): Promise<string> {
    const db = mysql.createConnection({
      host: config?.database?.host,
      user: config?.database?.user,
      password: config?.database?.password,
      database: config?.database?.name,
      multipleStatements: true
    })

    return new Promise((resolve, reject) => {
      const sql: string = `
				CREATE TABLE IF NOT EXISTS users(
					id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
					name VARCHAR(255) NOT NULL,
					email VARCHAR(255) NOT NULL UNIQUE,
					createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
				);

				CREATE TABLE IF NOT EXISTS rooms(
					id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
					name VARCHAR(255) NOT NULL,
					createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
				);

				CREATE TABLE IF NOT EXISTS chats(
					id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
					roomId INT(11) NOT NULL,
					userId INT(11) NOT NULL,
					message VARCHAR(255) NOT NULL,
					createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

					FOREIGN KEY (roomId) REFERENCES rooms(id),
					FOREIGN KEY (userId) REFERENCES users(id)
				);

				CREATE INDEX usersIndex ON users (id, email);
				CREATE INDEX roomsIndex ON rooms (id);
				CREATE INDEX chatsIndex ON chats (id);
			`
      db.query(sql, (err: QueryError) => {
        if (err !== null) {
          db.destroy()
          reject(err)
        } else {
          db.destroy()
          resolve('The tables have been created')
        }
      })
    })
  }

  public async sync (): Promise<void> {
    try {
      await this.createDatabase()

      try {
        await this.createTables()
        console.log('The database has been created')
      } catch (err) {
        const error = err as { message: string }
        console.error(error.message)
      }
    } catch (err) {
      const error = err as { message: string }
      console.error(error.message)
    }
  }

  public get db (): Connection {
    return mysql.createConnection({
      host: config?.database?.host,
      user: config?.database?.user,
      password: config?.database?.password,
      database: config?.database?.name,
      multipleStatements: true
    })
  }
}

export default Database
