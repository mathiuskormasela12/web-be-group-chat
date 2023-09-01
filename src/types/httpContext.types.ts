// ========== Http Context Types

export interface HttpContextReturnValue {
  decoded: {
    id: string
  }
}

export type HttpContext = () => Promise<HttpContextReturnValue>
