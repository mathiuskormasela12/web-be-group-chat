// ========== Http Context
// import all packages
import { type HttpContext } from '../types'

export const httpContext: HttpContext = async () => {
  return {
    decoded: {
      id: '1'
    }
  }
}
