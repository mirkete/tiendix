import { Router } from "express"
import { checkLogin } from "../../middlewares/checkLogin.js"
import { OrdersController } from "../../controllers/ordersController.js"

export function createOrdersRouter () {
  const ordersRouter = Router()
  const ordersController = new OrdersController()

  ordersRouter.get("/", checkLogin(), ordersController.getOrdersByShopId)

  return ordersRouter
}