import mysql from 'mysql2/promise'
import { checkUUID } from '../schemas/ProductSchemas.js'
import { ValidationError, DatabaseError } from '../utils/customErrors.js'

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mirkito18',
  database: 'tiendix'
})

export class ShopsModel {
  static getProductsByShopId = async ({ id }) => {
    const validation = checkUUID({ id })
    if (!validation.success) {
      return { success: false, data: null, error: new ValidationError('Invalid request') }
    }

    try {
      const response = await connection.execute(
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

  static getOrdersByShopId = async ({ id }) => {
    const validation = checkUUID({ id })
    if (!validation.success) {
      return { success: false, data: null, error: new ValidationError('Invalid request') }
    }

    try {
      const response = await connection.execute(
        'SELECT BIN_TO_UUID(product_id) AS product_id, COUNT(product_id) AS count, BIN_TO_UUID(shop_id) AS shop_id, clients.name AS client_name, clients.email AS client_email ' +
        'FROM orders ' +
        'JOIN clients ON clients.id = orders.client_id ' +
        'WHERE UUID_TO_BIN(?) = shop_id ' +
        'GROUP BY product_id, shop_id, client_name, client_email',
        [id]
      )

      const data = response[0]
      return { success: true, data }
    } catch (e) {
      console.log(e)
      return { success: false, data: null, error: new DatabaseError('Database error') }
    }
  }
}
