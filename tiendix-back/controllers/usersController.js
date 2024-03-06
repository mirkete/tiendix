import { logUser, registerUser } from "../context/Users/Application/index.js"
import { SqlUsersRepository } from "../context/Users/Infrastructure/SqlUsersRepository.js"
import { handleError } from "../utils/errorHandler.js"

const usersRepository = SqlUsersRepository

export class UsersController {
  logUser = async (req, res) => {
    const response = await logUser(usersRepository, req.body)
    if (!response.success) {
      return handleError(res, response.error)
    }

    res.status(200).json(response.data)
  }

  registerUser = async (req, res) => {
    const response = await registerUser(usersRepository, req.body)
    if (!response.success) {
      return handleError(res, response.error)
    }

    res.status(200).json(response.data)
  }
}