// ========== User Service
// import all packahe
import { type PrismaClient } from '@prisma/client'
import { type User } from '../types'

export class UserService {
  constructor (private readonly prismaClient: PrismaClient) {}

  public async getUsers (): Promise<User[]> {
    return await this.prismaClient.users.findMany()
  }
}
