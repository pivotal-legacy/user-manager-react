import expect from 'expect'
import * as webdriverio from 'webdriverio'

import Server from './helpers/Server'

describe('integration tests', () => {
  let server, browser
  beforeEach(async () => {
    server = new Server()
    await server.start()

    browser = webdriverio.remote().init().url('http://localhost:8081')
  })

  afterEach(async () => {
    server.stop()
    await browser.end()
  })

  it('has the correct header', async () => {
    const header = await browser.getText('h1')
    expect(header).toBe('User Manager')
  })
})