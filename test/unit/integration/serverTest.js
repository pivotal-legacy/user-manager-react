import expect from "expect"
import child_process from "child_process"
import mockSpawn from 'mock-spawn'

import Server from "../../integration/helpers/Server"
import { toEventuallyThrow } from '../helpers/asyncHelpers'

describe('Server', () => {
  it('shells out to run the make script to start the front end for integration tests', () => {
    const subject = new Server()
    const mySpawn = mockSpawn()
    child_process.spawn = mySpawn

    subject.start()

    expect(mySpawn.calls[0].command).toBe('make start-integration')
  })

  it('start resolves when the front end is ready', async () => {
    const subject = new Server()
    const mySpawn = mockSpawn()
    child_process.spawn = mySpawn
    mySpawn.setStrategy(() => function() {
        this.stdout.write('stuff happening but not ready');
        this.stdout.write('stuff happening but not ready');
        this.stdout.write('webpack: Compiled successfully.');
    })

    const startupResult = await subject.start()

    expect(startupResult).toBe('Server ready!')
  })

  it('times out if the server does not start within the expected time frame', async () => {
    const subject = new Server()
    const mySpawn = mockSpawn()
    child_process.spawn = mySpawn
    mySpawn.setStrategy(() => function() {
        this.stdout.write('stuff happening but not ready');
        this.stdout.write('stuff happening but not ready');
    })

    const didThrowError = await toEventuallyThrow(subject.start, 'Server failed to start.')

    expect(didThrowError).toBe(true)
  })
})