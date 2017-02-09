import expect from 'expect'

import Server from './helpers/Server'

describe('integration tests', () => {
  let server
  beforeEach(async () => {
    server = new Server()
    await server.start()
  })

  afterEach(async () => {
    await server.stop()
  })

  it('runs an integration test', () => {
    expect(true).toBe(true)
  })
})