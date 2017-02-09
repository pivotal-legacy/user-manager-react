export const asyncPromise = result => {
  return new Promise(resolve => {
      setTimeout(() => {
        resolve(result)
      }, 0)
    }
  )
}

export const toEventuallyThrow = async (fn, msg) => {
  try {
    await fn()
  } catch(error) {
    return error.message == msg
  }
  return false
}