import crypto from "node:crypto"
import { ProductsRepository } from "../Domain/ProductsRepository.js";
import { validateUUID } from "../../../schemas/ValidateUUID.js";
import { validateProduct, validatePartialProduct } from "../../../schemas/ProductSchemas.js";
import { ValidationError, DatabaseError } from "../../../utils/customErrors.js"
import { pool } from "../../../database/database.js"

export class SqlProductsRepository extends ProductsRepository {

  static createProduct = async (productData) => {
    const product = {
      id: crypto.randomUUID(),
      ...productData
    }
    const validation = await validateProduct(product)
    if (!validation.success) {
      return { success: false, data: null, error: new ValidationError('Invalid request') }
    }

    const { id, name, price, quantity, shop_id } = validation.data
    try {
      await pool.execute(
        'INSERT INTO products (id, name, price, quantity, shop_id) ' +
        'VALUES (UUID_TO_BIN(?), ?, ?, ?, UUID_TO_BIN(?))',
        [id, name, price, quantity, shop_id]
      )

      return { success: true, data: validation.data }
    } catch (e) {
      return { success: false, data: null, error: new DatabaseError("Database error") }
    }
  }

  static getProducts = async ({ id }) => {
    const validation = await validateUUID({ id })
    if (!validation.success) {
      return { success: false, data: null, error: new ValidationError('Invalid request') }
    }

    try {
      const response = await pool.execute(
        'SELECT BIN_TO_UUID(id) AS id, name, price, quantity FROM products ' +
        'WHERE UUID_TO_BIN(?) = shop_id',
        [id]
      )
      const data = response[0]
      return { success: true, data }
    } catch (e) {
      return { success: false, data: null, error: new DatabaseError('Database error') }
    }
  }

  static updateProduct = async (product) => {
    const validation = await validatePartialProduct(product)
    if (!validation.success) {
      return { success: false, data: null, error: new ValidationError('Invalid request') }
    }

    const id = validation.data.id
    const productIdIndex = Object.keys(product).findIndex((field) => field === "id")
    let changeKeys = Object.keys(product)
    let changeValues = Object.values(product)

    changeKeys.splice(productIdIndex, 1)
    changeValues.splice(productIdIndex, 1)

    let keyValueArray = []
    for (let i = 0; i < changeKeys.length; i++) {
      let changeKey = changeKeys[i]
      keyValueArray[i] = `${changeKey}=?`
    }

    const keyValues = keyValueArray.join(",")

    try {
      await pool.execute(
        `UPDATE products ` +
        `SET ${keyValues} ` +
        `WHERE BIN_TO_UUID(id) = ?`,
        [...changeValues, id]
      )

      return { success: true, data: validation.data }
    } catch (e) {
      return { success: false, data: null, error: new DatabaseError("Database error") }
    }
  }

  static deleteProduct = async ({ id }) => {
    const validation = await validateUUID({ id })
    if (!validation.success) {
      return { success: false, data: null, error: new ValidationError('Invalid request') }
    }

    try {
      await pool.execute(
        'DELETE FROM products ' +
        'WHERE BIN_TO_UUID(id) = ?',
        [id]
      )

      return { success: true, data: { message: "Product removed", id } }
    } catch (e) {
      return { success: false, data: null, error: new DatabaseError(e) }
    }
  }
}