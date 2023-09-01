// ========== Config
// import all packages
import 'dotenv/config'

const Config = {
  PORT: Number(process.env?.SERVICE_PORT ?? 3000),
  APP_URL: String(process.env?.SERVICE_APP_URL ?? 'http://localhost:3000'),
  WEB_CLIENTS: String(process.env?.SERVICE_WEB_CLIENTS ?? '').split(','),
  JWT_ACCESS_TOKEN: {
    KEY: String(process.env?.JWT_ACCESS_TOKEN_KEY ?? 'secret'),
    EXPIRES_IN: String(process.env?.JWT_ACCESS_TOKEN_EXPIRES_IN ?? '1m')
  },
  JWT_REFRESH_TOKEN: {
    KEY: String(process.env?.JWT_REFRESH_TOKEN_KEY ?? 'secret'),
    EXPIRES_IN: String(process.env?.JWT_REFRESH_TOKEN_EXPIRES_IN ?? '1m')
  }
}

export default Config
