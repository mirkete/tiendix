import mysql from "mysql2/promise"
import { productionDBConfig } from '../../Shared/ValueObjects/dbConfig.js'
import { ProductsRepository } from "../Domain/ProductsRepository.js";
import { validateUUID } from "../../../schemas/ProductSchemas.js";
import { ValidationError, DatabaseError } from "../../../utils/customErrors.js"

const dbConfig = productionDBConfig

const pool = mysql.createPool(dbConfig)

export class SqlProductsRepository extends ProductsRepository {
  static getProducts = async (data) => {
    const validation = validateUUID(data)
    if (!validation.success) {
      return { success: false, data: null, error: new ValidationError('Invalid request') }
    }

    const { id } = data
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
}