// ========= User Service Test
// import all packages
import { type PrismaClient } from '@prisma/client'
import { UserService } from '../src/services'

describe('User Service', () => {
  let userService: UserService

  beforeEach(() => {
    const prismaMock = {
      users: {
        findMany: jest.fn().mockResolvedValue([])
      }
    } as const

    userService = new UserService(prismaMock as unknown as PrismaClient)
  })

  it('shoul be defined', () => {
    expect(UserService).toBeDefined()
    expect(userService).toBeInstanceOf(UserService)
  })
  it('should return empty array', async () => {
    await expect(userService.getUsers()).resolves.toEqual([])
  })
})
