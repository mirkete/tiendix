import test from 'node:test'
import assert from 'node:assert'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { testUser, shopId } from './test-config.js'
import { SqlUsersRepository } from './context/Users/Infrastructure/SqlUsersRepository.js'
import { SqlProductsRepository } from './context/Products/Infrastructure/SqlProductsRepository.js'
import { logUser } from './context/Users/Application/index.js'
import { getProducts } from "./context/Products/Application/index.js"
import { disconnectDatabase } from './database/database.js'

const UsersRepository = SqlUsersRepository
const ProductsRepository = SqlProductsRepository

test("Multiple tests", async (t) => {
  await t.test('Log user', async () => {
    const { data: token } = await logUser(UsersRepository, testUser)
    const { id, email, shopId } = jwt.verify(token, process.env.PRIVATE_KEY)

    const tokenData = { id, email, shopId }
    const expectedData = {
      id: 'd7025236-e7a6-11ee-a3a8-4cedfb468ce2',
      email: 'test@test.com',
      shopId: '8f8199e5-e7a6-11ee-a3a8-4cedfb468ce2'
    }

    return assert.deepStrictEqual(expectedData, tokenData)
  })

  await t.test('Reject bad credentials', async () => {
    const { success } = await logUser(UsersRepository, { email: testUser.email, password: 'bad-password' })

    return assert.deepStrictEqual(success, false)
  })

  await t.test('Get products', async () => {
    const { data } = await getProducts(ProductsRepository, { id: shopId })

    const expectedData = [{
      id: 'e193cd37-e7a6-11ee-a3a8-4cedfb468ce2',
      name: 'Test product',
      price: 128,
      quantity: 8
    }]

    return assert.deepStrictEqual(expectedData, data)
  })

  await t.test('Disconnect database', async () => {
    return disconnectDatabase()
  })
})
