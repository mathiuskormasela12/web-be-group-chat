/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-misused-promises */
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

    return await new Promise((resolve, reject) => {
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
      database: config?.database?.name
    })

    return await new Promise((resolve, reject) => {
      const sql: string = `
				CREATE TABLE IF NOT EXISTS users(
					id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
					name VARCHAR(255) NOT NULL,
					email VARCHAR(255) NOT NULL UNIQUE,
					createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
					updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
				);
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

  public async sync (): Promise<string> {
    return await new Promise(async (resolve, reject) => {
      try {
        await this.createDatabase()

        try {
          await this.createTables()
          resolve('The database has been created')
        } catch (err) {
          const error = err as { message: string }
          reject(new Error(`The database has been created, but failed to be created tables because of ${String(error.message.toLowerCase())}`))
        }
      } catch (err) {
        reject(err)
      }
    })
  }

  public get db (): Connection {
    return mysql.createConnection({
      host: config?.database?.host,
      user: config?.database?.user,
      password: config?.database?.password,
      database: config?.database?.name
    })
  }
}

export default Database
