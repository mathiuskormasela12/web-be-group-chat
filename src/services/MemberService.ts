// ========== Member Service
// import all modules

import { type Request } from 'express'
import { type IResponse } from '../types/response'

class MemberService {
  private readonly body: Request['body']
  private readonly query: Request['query']
  private readonly params: Request['params']

  constructor (req: Request) {
    this.body = req.body
    this.query = req.query
    this.params = req.params
  }

  public joinRoom (): IResponse<unknown> {
    return {
      code: 200,
      status: 'Ok',
      data: this.body,
      pageInfo: {
        totalData: 10,
        totalPages: 10
      }
    }
  }
}

export default MemberService
