import { Router } from 'express'
import { ShopsController } from '../controllers/shopsController.js'

export function createApiRouter ({ model }) {
  const apiRouter = Router()
  const shopsController = new ShopsController({ model })

  apiRouter.get('/', (req, res) => {
    res.writeHead(200)
    res.end('API working')
  })

  apiRouter.get('/products', shopsController.getProductsByShopId)

  apiRouter.get('/orders', shopsController.getOrdersByShopId)

  return apiRouter
}
