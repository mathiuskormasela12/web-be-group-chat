// ========== App
// import all modules
import express, { type Application } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors, { type CorsOptions } from 'cors'
import config from '../config'
import MemberRouter from '../routers/MemberRouter'

class App {
  private readonly app: Application

  constructor () {
    this.app = express()
    this.setup()
  }

  private setup (): void {
    // Setup middlewares
    this.app.use(compression())
    this.app.use(helmet())

    if (config?.base?.env === 'development') {
      this.app.use(require('morgan')('dev'))
    }

    // Setup url-encoded & json
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.json())

    // Setup Cors
    const corsOption: CorsOptions = {
      origin (origin, callback) {
        if (typeof origin !== 'string' || config.clients.includes(origin)) {
          callback(null, true)
        } else {
          callback(new Error('Blocked by cors'))
        }
      }
    }
    this.app.use(cors(corsOption))

    // Define routes
    const memberRouter = new MemberRouter()

    this.app.use('/api/v1/member', memberRouter.route)
  }

  public listen (): void {
    this.app.listen(config?.base?.port, () => {
      console.log(`The RESTful API is being run at ${config?.base?.appUrl ?? ''}`)
    })
  }
}

export default App
