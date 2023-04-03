// ========== Response
// import all modules
import { type Request, type Response } from 'express'
import { type IResponse, type ResponseFunc } from '../types/response'
import config from '../config'

export const response: ResponseFunc = <T>(req: Request, res: Response, payload: IResponse<T>): Response => {
  if ((payload?.pageInfo) != null) {
    payload.pageInfo = {
      ...payload.pageInfo,
      previousLink: (Number(req?.query?.page) > 1) ? `${config.base.apiUrl}/?${Object.keys(req.query).map((key: string, index: number) => `${key}=${key === 'page' ? Number(Object.values(req.query)[index] as string) - 1 : Object.values(req.query)[index] as string}`).join('&')}` : null,
      nextLink: (Number(req?.query?.page) < payload.pageInfo.totalPages) ? `${config.base.apiUrl}/?${Object.keys(req.query).map((key: string, index: number) => `${key}=${key === 'page' ? Number(Object.values(req.query)[index] as string) + 1 : Object.values(req.query)[index] as string}`).join('&')}` : null
    }
  }

  return res.status(payload?.code ?? 200).json(payload)
}
