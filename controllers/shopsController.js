import { handleError } from '../utils/errorHandler.js'

export class ShopsController {
  constructor ({ model }) {
    this.model = model
  }

  logUser = async (req, res) => {
    const response = await this.model.logUser(req.body)
    if (!response.success) {
      return handleError(res, response.error)
    }

    res.status(200).json(response.data)
  }

  registerUser = async (req, res) => {
    const response = await this.model.registerUser(req.body)
    if (!response.success) {
      return handleError(res, response.error)
    }

    res.status(200).json(response.data)
  }

  getProductsByShopId = async (req, res) => {
    const response = await this.model.getProductsByShopId(req.query)
    if (!response.success) {
      return handleError(res, response.error)
    }

    res.status(200).json(response.data)
  }

  getOrdersByShopId = async (req, res) => {
    const response = await this.model.getOrdersByShopId(res.locals)
    if (!response.success) {
      return handleError(res, response.error)
    }

    res.status(200).json(response.data)
  }
}
