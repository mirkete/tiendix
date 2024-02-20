const errorResponses = {
  ValidationError: (res, message) => {
    res.status(400).send(message)
  },
  DatabaseError: (res, message) => {
    res.status(500).send('Unexpected error')
  },
  DefaultError: (res, message) => {
    res.status(500).send('Unexpected error')
  }
}

export function handleError (res, error) {
  const { name, message } = error
  const responseFunction = errorResponses[name] ?? errorResponses.DefaultError
  return responseFunction(res, message)
}
