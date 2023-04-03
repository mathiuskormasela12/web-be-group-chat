// ========== Router
// import all modules
import { type Router as ExpressRouter } from 'express'

abstract class Router {
  protected abstract readonly router: ExpressRouter

  public abstract get route (): ExpressRouter
}

export default Router
