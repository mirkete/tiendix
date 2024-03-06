import test from 'node:test'
import assert from 'node:assert'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { testUser, testPoolConfig, shopId } from './test-config.js'
import { createShopsModel } from './models/shopsModel.js'

const ShopsModel = createShopsModel(testPoolConfig)

test('Authentication', async (t) => {
  await t.test('Log user', async () => {
    const { data: token } = await ShopsModel.logUser(testUser)
    const { id, email, shopId } = jwt.verify(token, process.env.PRIVATE_KEY)

    const tokenData = { id, email, shopId }
    const expectedData = {
      id: '2d8860a0-d0d6-11ee-a51c-ace2d37d429a',
      email: 'user@test.com',
      shopId: 'b762343e-d0d5-11ee-a51c-ace2d37d429a'
    }

    return assert.deepStrictEqual(expectedData, tokenData)
  })

  await t.test('Reject bad credentials', async () => {
    const { success } = await ShopsModel.logUser({ email: testUser.email, password: 'bad-password' })

    return assert.deepStrictEqual(success, false)
  })

  await t.test('Get products', async () => {
    const { data } = await ShopsModel.getProductsByShopId({ id: shopId })

    const expectedData = [{
      id: '90edae62-d0d6-11ee-a51c-ace2d37d429a',
      name: 'Example product',
      price: 128,
      quantity: 8
    }]

    return assert.deepStrictEqual(expectedData, data)
  })

  await t.test('Get orders', async () => {
    const { data } = await ShopsModel.getOrdersByShopId({ shopId })

    const expectedData = [{
      product_id: '90edae62-d0d6-11ee-a51c-ace2d37d429a',
      count: 1,
      shop_id: shopId,
      client_name: 'Test client',
      client_email: 'client@test.com'
    }]

    return assert.deepStrictEqual(data, expectedData)
  })

  await t.test('Disconnect database', async () => {
    return ShopsModel.disconnectDatabase()
  })
})
