// ========= Server
// import all packages
import { Server } from '../src/core'

describe('Server', () => {
  const server = new Server()

  it('should be defined', () => {
    expect(Server).toBeDefined()
    expect(server).toBeInstanceOf(Server)
  })

  it('should return "Hello Typescript"', () => {
    expect(server.send()).toBe('Hello Typescript')
  })
})
