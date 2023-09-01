// ========== Resolvers
// import all packages
import { PrismaClient } from '@prisma/client'
import { dateScalar } from '../scalar'
import { UserService } from '../services'
import { type HttpContextReturnValue, type Resolvers } from '../types'

const prismaClient = new PrismaClient()

const userService = new UserService(prismaClient)

export const resolvers: Resolvers<HttpContextReturnValue> = {
  Date: dateScalar,
  Query: {
    users: async () => await userService.getUsers()
  }
}
