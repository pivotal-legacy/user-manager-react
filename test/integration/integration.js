import expect from 'expect'

import Server from './helpers/Server'

describe('integration tests', () => {
  beforeEach(async () => {
    const server = new Server()
    await server.start()
  })

  it('runs an integration test', () => {
    expect(true).toBe(true)
  })
})