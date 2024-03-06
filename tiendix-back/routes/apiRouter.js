import { Router } from 'express'
import { ShopsController } from '../controllers/shopsController.js'

import {
  createOrdersRouter,
  createProductsRouter,
  createShopsRouter,
  createUsersRouter
}
  from "./apiRoutes/index.js"

export function createApiRouter () {
  const apiRouter = Router()

  apiRouter.get('/', (req, res) => {
    res.writeHead(200)
    res.end('API working')
  })

  apiRouter.use('/users', createUsersRouter())

  apiRouter.use('/products', createProductsRouter())

  apiRouter.use('/shops', createShopsRouter())

  apiRouter.use('/orders', createOrdersRouter())

  return apiRouter
}
