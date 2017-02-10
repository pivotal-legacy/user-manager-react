import expect from "expect"
import child_process from "child_process"
import mockSpawn from 'mock-spawn'

import Server from "../../integration/helpers/Server"
import { toEventuallyThrow } from '../helpers/asyncHelpers'

describe('Server', () => {
  let subject, mySpawn

  it('shells out to run the make script to start the front end server for integration tests', async () => {
    await startServer(successOutput)

    const firstCall = mySpawn.calls[0]
    expect(firstCall.command).toBe('npm')
    expect(firstCall.args).toEqual(['start', '--', '--port=8081'])
  })

  it('start resolves when the front end is ready', async () => {
    await startServer(successOutput)

    const startupResult = await subject.start()

    expect(startupResult).toBe('Server ready!')
  })

  it('times out if the server does not start within the expected time frame', async () => {
    await startServer(failureOutput)

    const didThrowError = await toEventuallyThrow(subject.start, 'Server failed to start.')

    expect(didThrowError).toBe(true)
  })

  it('kills the front end server that was started for integration tests', async () => {
    await startServer(successOutput)
    const killSpy = expect.spyOn(subject.process, 'kill')

    await subject.stop()

    expect(killSpy).toHaveBeenCalled()
  })

  const failureOutput = () => {
    this.stdout.write('stuff happening but not ready')
    this.stdout.write('stuff happening but not ready')
  }

  const successOutput = () => {
    this.stdout.write('stuff happening but not ready')
    this.stdout.write('stuff happening but not ready')
    this.stdout.write('webpack: Compiled successfully.')
  }

  const startServer = async stdout => {
    subject = new Server()
    mySpawn = mockSpawn()
    child_process.spawn = mySpawn
    mySpawn.setStrategy(() => stdout)
    await subject.start()
  }
})