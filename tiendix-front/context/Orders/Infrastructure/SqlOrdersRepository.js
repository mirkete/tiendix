import { OrdersRepository } from "../Domain/OrdersRepository.js"
import { validateUUID } from "../../../schemas/ValidateUUID.js"
import { ValidationError, DatabaseError } from "../../../utils/customErrors.js"
import { pool } from "../../../database/database.js"

export class SqlOrdersRepository extends OrdersRepository {
  static getOrders = async (data) => {
    const { shopId } = data
    const shopIdObject = { id: shopId }
    const validation = await validateUUID(shopIdObject)
    if (!validation.success) {
      console.log(validation)
      return { success: false, data: null, error: new ValidationError('Invalid request') }
    }

    const { id } = validation.data
    try {
      const response = await pool.execute(
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
      return { success: false, data: null, error: new DatabaseError('Database error') }
    }
  }
}