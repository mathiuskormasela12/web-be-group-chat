// ========== Server
// import all packages
import express, { type Application } from 'express'
import cors, { type CorsOptions } from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4'
import { join } from 'path'
import { readFileSync } from 'fs'
import Config from '../config'
import { resolvers } from './'
import { type Resolvers } from '../types'
import { httpContext } from '../context'

export class Server {
  private readonly app: Application
  private readonly apolloServer: ApolloServer

  constructor () {
    this.app = express()

    // Define GraphQL Schema
    const typeDefs = readFileSync(join(__dirname, '../../schema.graphql'), 'utf-8')

    // Instantiate Apollo Server
    this.apolloServer = new ApolloServer<Resolvers>({ typeDefs, resolvers })

    this.setup()
  }

  private setup (): void {
    // Setup Json & Url Encoded
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))

    // Define Cors Options
    const corsOptions: CorsOptions = {
      origin (origin, callback) {
        if (typeof origin === 'undefined' || Config.WEB_CLIENTS.includes(origin)) {
          callback(null, true)
        } else {
          callback(new Error('Blocked by cors'))
        }
      }
    }

    // Setup Cors
    this.app.use(cors(corsOptions))
  }

  public async listen (): Promise<void> {
    await this.apolloServer.start()

    // Append Apollo Server to Express
    this.app.use('/graphql', apolloMiddleware(this.apolloServer, { context: httpContext }))

    this.app.listen(Config.PORT, () => {
      console.log('The server is being run at', Config.APP_URL)
      console.log('The server is being run at', Config.APP_URL.concat('/graphql'))
    })
  }

  public send (): string {
    return 'Hello Typescript'
  }
}

// 89-67
