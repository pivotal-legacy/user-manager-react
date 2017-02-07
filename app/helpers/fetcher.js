export const get = (url) => {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.json()
  })
}
