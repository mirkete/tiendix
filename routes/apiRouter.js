import { Router } from 'express'
import { ShopsController } from '../controllers/shopsController.js'
import { checkLogin } from '../middlewares/checkLogin.js'

export function createApiRouter ({ model }) {
  const apiRouter = Router()
  const shopsController = new ShopsController({ model })

  apiRouter.get('/', (req, res) => {
    res.writeHead(200)
    res.end('API working')
  })

  apiRouter.post('/register', shopsController.registerUser)

  apiRouter.post('/login', shopsController.logUser)

  apiRouter.get('/products', shopsController.getProductsByShopId)

  apiRouter.get('/orders', checkLogin(), shopsController.getOrdersByShopId)

  return apiRouter
}
