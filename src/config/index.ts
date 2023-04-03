// ========== Config
// import all modules
import 'dotenv/config'

export default {
  base: {
    env: process?.env?.NODE_ENV ?? 'development',
    port: process?.env?.APP_PORT ?? 3000,
    appUrl: process?.env?.APP_URL ?? 'http://localhost:3000',
    apiUrl: process?.env?.API_URL ?? 'http://localhost:3000/api/v1'
  },
  jwt: {
    accessToken: {
      secretKey: process?.env?.APP_ACCESS_TOKEN_SECRET_KEY ?? 'secret',
      expiresIn: process?.env?.APP_ACCESS_TOKEN_EXPIRES_IN ?? '1m'
    },
    refreshToken: {
      secretKey: process?.env?.APP_REFRESH_TOKEN_SECRET_KEY ?? 'secret',
      expiresIn: process?.env?.APP_REFRESH_TOKEN_EXPIRES_IN ?? '5m'
    }
  },
  database: {
    host: process?.env?.APP_DATABASE_HOST ?? 'localhost',
    user: process?.env?.APP_DATABASE_USER ?? 'user',
    password: process?.env?.APP_DATABASE_PASSWORD ?? 'password',
    name: process?.env?.APP_DATABASE_NAME ?? 'database name'
  },
  clients: [
    'http://localhost:3000'
  ]
}
