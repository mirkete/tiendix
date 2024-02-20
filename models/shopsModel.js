import crypto from 'node:crypto'
import mysql from 'mysql2/promise'
import jwt from 'jsonwebtoken'
import { validateUUID, validateUser, validateUserRegister } from '../schemas/ProductSchemas.js'
import { ValidationError, DatabaseError, NotFoundError } from '../utils/customErrors.js'
import 'dotenv/config.js'

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env

const poolConfig = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
}

const pool = mysql.createPool(poolConfig)

const privateKey = process.env.PRIVATE_KEY

export class ShopsModel {
  static logUser = async (data) => {
    const validation = validateUser(data)
    if (!validation.success) {
      return { success: false, data: null, error: new ValidationError('Invalid request') }
    }

    const { email, password } = data
    try {
      const response = await pool.execute(
        'SELECT BIN_TO_UUID(id) AS id, email, BIN_TO_UUID(shop_id) AS shop_id FROM users ' +
        'WHERE email = ? AND password = ?',
        [email, password]
      )
      const data = response[0]
      if (data.length === 0) {
        return { success: false, data: null, error: new NotFoundError('Not found') }
      }

      const userData = { ...data[0], shopId: data[0].shop_id, shop_id: undefined }
      const token = jwt.sign(userData, privateKey, { expiresIn: '7d' })

      return { success: true, data: token }
    } catch (e) {
      return { success: false, data: null, error: new DatabaseError('Database error') }
    }
  }

  static registerUser = async (data) => {
    const validation = validateUserRegister(data)
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

      const userData = { id: userId, email, shopId }
      const token = jwt.sign(userData, privateKey)

      return { success: true, data: token }
    } catch (e) {
      return { success: false, data: null, error: new DatabaseError('Database error') }
    }
  }

  static getProductsByShopId = async (data) => {
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

  static getOrdersByShopId = async (data) => {
    const { shopId } = data
    const shopIdObject = { id: shopId }

    const validation = validateUUID(shopIdObject)
    if (!validation.success) {
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
