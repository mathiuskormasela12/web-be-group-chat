// ========== Member Router
// import all modules
import { Router as ExpressRouter } from 'express'
import Router from './Router'
import MemberController from '../controllers/MemberController'

class MemberRouter extends Router {
  protected router: ExpressRouter

  constructor () {
    super()
    this.router = ExpressRouter()

    this.routes()
  }

  private routes (): void {
    const memberController = new MemberController()

    this.router.post('/join', memberController.joinRoom)
  }

  public get route (): ExpressRouter {
    return this.router
  }
}

export default MemberRouter
