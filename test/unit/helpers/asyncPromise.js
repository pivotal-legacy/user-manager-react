export default result => {
  return new Promise(resolve => {
      setTimeout(() => {
        resolve(result)
      }, 0)
    }
  )
}
