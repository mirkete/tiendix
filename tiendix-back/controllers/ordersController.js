import { getOrders } from "../context/Orders/Application/GetOrders.js"
import { SqlOrdersRepository } from "../context/Orders/Infrastructure/SqlOrdersRepository.js"
import { handleError } from "../utils/errorHandler.js"

const ordersRepository = SqlOrdersRepository

export class OrdersController {
  getOrdersByShopId = async (req, res) => {
    const response = await getOrders(ordersRepository, res.locals)
    if (!response.success) {
      return handleError(res, response.error)
    }

    res.status(200).json(response.data)
  }
}