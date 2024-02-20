import { handleError } from '../utils/errorHandler.js'

export class ShopsController {
  constructor ({ model }) {
    this.model = model
  }

  getProductsByShopId = async (req, res) => {
    const response = await this.model.getProductsByShopId(req.query)
    if (!response.success) {
      return handleError(res, response.error)
    }

    res.status(200).json(response.data)
  }

  getOrdersByShopId = async (req, res) => {
    const response = await this.model.getOrdersByShopId(req.query)
    if (!response.success) {
      return handleError(res, response.error)
    }

    res.status(200).json(response.data)
  }
}
