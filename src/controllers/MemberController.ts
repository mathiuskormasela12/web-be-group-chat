// ========== Member Controller
// import all modules
import { type Request, type Response } from 'express'
import { response } from '../helpers'
import MemberService from '../services/MemberService'

class MemberController {
  public joinRoom (req: Request, res: Response): Response {
    const result = new MemberService(req)

    return response(req, res, result.joinRoom())
  }
}

export default MemberController
