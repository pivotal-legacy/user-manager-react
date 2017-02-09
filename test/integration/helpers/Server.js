import {spawn} from 'child_process'

export default class Server {
  start = async () => {
    const spawnedProcess = spawn('make', ['start-integration'])

    return await new Promise((resolve, reject) => {
      spawnedProcess.stdout.on('data', data => {
        if (data.includes('webpack: Compiled successfully.')) {
          resolve('Server ready!')
        }
      })
      setTimeout(() => {
        reject(new Error('Server failed to start.'))
      }, process.env.NODE_SERVER_STARTUP_TIMEOUT)
    })
  }

  stop = async () => {
    await spawn('make', ['stop-integration'])
  }
}