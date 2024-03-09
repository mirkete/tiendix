import { SqlProductsRepository } from "../context/Products/Infrastructure/SqlProductsRepository.js"
import { createProduct, getProducts, updateProduct, deleteProduct } from "../context/Products/Application/index.js"
import { handleError } from "../utils/errorHandler.js"

const productsRepository = SqlProductsRepository

export class ProductsController {

  createProduct = async (req, res) => {
    const response = await createProduct(productsRepository, req.body)
    if (!response.success) {
      return handleError(res, response.error)
    }

    res.status(200).json(response.data)
  }

  getProductsByShopId = async (req, res) => {
    const response = await getProducts(productsRepository, req.query)
    if (!response.success) {
      return handleError(res, response.error)
    }

    res.status(200).json(response.data)
  }

  updateProduct = async (req, res) => {
    const response = await updateProduct(productsRepository, req.body)
    if (!response.success) {
      return handleError(res, response.error)
    }

    res.status(200).json(response.data)
  }

  deleteProduct = async (req, res) => {
    const response = await deleteProduct(productsRepository, req.body)
    if (!response.success) {
      return handleError(res, response.error)
    }

    res.status(200).json(response.data)
  }
}