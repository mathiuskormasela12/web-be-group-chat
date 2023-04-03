// ========== Response Types
// import all modules
import { type Request, type Response } from 'express'

export interface IResponse<T> {
  code: number
  status: string
  data?: T | T[]
  errors?: Record<string, string[]>
  pageInfo?: {
    totalPages: number
    totalData: number
    previousLink?: string | null
    nextLink?: string | null
  }
}

export type ResponseFunc = <T>(_: Request, __: Response, ___: IResponse<T>) => Response
