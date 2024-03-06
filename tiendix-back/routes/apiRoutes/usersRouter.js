import { Router } from "express"
import { UsersController } from "../../controllers/usersController.js"

export function createUsersRouter () {
  const usersRouter = Router()
  const usersController = new UsersController()

  usersRouter.post("/login", usersController.logUser)
  usersRouter.post("/register", usersController.registerUser)

  return usersRouter
}