import { UsersRepository } from "../Domain/UsersRepository.js";
import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import { validateUser, validateUserRegister } from "../../../schemas/UserSchemas.js"
import { ValidationError, DatabaseError, NotFoundError } from "../../../utils/customErrors.js"
import { privateKey } from '../../Shared/ValueObjects/environment.js'
import { pool } from "../../../database/database.js"

export class SqlUsersRepository extends UsersRepository {
  static logUser = async (userCredentials) => {
    const validation = validateUser(userCredentials)
    if (!validation.success) {
      return { success: false, data: null, error: new ValidationError('Invalid request') }
    }

    const { email, password } = userCredentials
    try {
      const response = await pool.execute(
        'SELECT BIN_TO_UUID(users.id) AS id, email, BIN_TO_UUID(shop_id) AS shop_id, shops.name AS shopName FROM users ' +
        'JOIN shops ON users.shop_id = shops.id ' +
        'WHERE email = ? AND password = ?',
        [email, password]
      )
      const data = response[0]
      if (data.length === 0) {
        return { success: false, data: null, error: new NotFoundError('Not found') }
      }

      const {shopName} = data[0]
      const userData = { ...data[0], shopId: data[0].shop_id, shop_id: undefined }
      const token = jwt.sign(userData, privateKey, { expiresIn: '7d' })

      return { success: true, data: {token, shopName} }
    } catch (e) {
      return { success: false, data: null, error: new DatabaseError(e) }
    }
  }

  static registerUser = async (userData) => {
    const validation = validateUserRegister(userData)
    if (!validation.success) {
      return { success: false, data: null, error: new ValidationError('Invalid User') }
    }

    const { email, password, shop_name: shopName } = validation.data
    const shopId = crypto.randomUUID()
    const userId = crypto.randomUUID()
    try {
      const [userExists] = await pool.execute(
        'SELECT 1 FROM USERS ' +
        'WHERE email = ?',
        [email]
      )
      if (userExists.length > 0) {
        return { success: false, data: null, error: new DatabaseError('User exists') }
      }

      const createShop = pool.execute(
        'INSERT INTO shops(id, name) VALUES (UUID_TO_BIN(?), ?)',
        [shopId, shopName]
      )
      const createUser = pool.execute(
        'INSERT INTO users (id, email, password, shop_id) ' +
        'VALUES (UUID_TO_BIN(?), ?, ?, UUID_TO_BIN(?))',
        [userId, email, password, shopId]
      )
      await Promise.all([createShop, createUser])

      const tokenData = { id: userId, email, shopId }
      const token = jwt.sign(tokenData, privateKey)

      return { success: true, data: {token, shopName} }
    } catch (e) {
      return { success: false, data: null, error: new DatabaseError('Database error') }
    }
  }
}