import { SqlProductsRepository } from "../context/Products/Infrastructure/SqlProductsRepository.js"
import { getProducts } from "../context/Products/Application/index.js"

const productsRepository = SqlProductsRepository

export class ProductsController {
  getProductsByShopId = async (req, res) => {
    const response = await getProducts(productsRepository, req.query)
    if (!response.success) {
      return handleError(res, response.error)
    }

    res.status(200).json(response.data)
  }
}