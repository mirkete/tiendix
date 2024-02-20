export class ValidationError extends Error {
  constructor (message) {
    super()
    this.name = 'ValidationError'
    this.message = message
  }
}

export class DatabaseError extends Error {
  constructor (message) {
    super()
    this.name = 'DatabaseError'
    this.message = message
  }
}
