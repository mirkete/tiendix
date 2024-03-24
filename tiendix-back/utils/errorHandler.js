const errorResponses = {
  ValidationError: (res, message) => {
    res.status(400).json({err:message})
  },
  DatabaseError: (res, message) => {
    res.status(500).json({err:message})
  },
  DefaultError: (res, message) => {
    res.status(500).json({err:message})
  }
}

export function handleError (res, error) {
  const { name = "Error", message = "Error occured" } = error
  const responseFunction = errorResponses[name] ?? errorResponses.DefaultError
  return responseFunction(res, message)
}
