import { Router } from "express"
import { ProductsController } from "../../controllers/productsController.js"

export function createProductsRouter () {
  const productsRouter = Router()
  const productsController = new ProductsController()

  productsRouter.get("/", productsController.getProductsByShopId)
  productsRouter.post("/", productsController.createProduct)
  productsRouter.put("/", productsController.updateProduct)
  productsRouter.delete("/", productsController.deleteProduct)

  return productsRouter
}