import { z } from 'zod'

// Schemas

const Product = z.object({
  id: z.string().uuid(),
  name: z.string().max(128),
  price: z.number().max(999999),
  quantity: z.number(9999),
  shop_id: z.string().uuid()
})

const PartialProduct = Product.partial().required({
  id: true
})


// Validate functions
export async function validateProduct (product) {
  return Product.safeParse(product)
}

export async function validatePartialProduct (product) {
  const length = Object.keys(product).length
  if (length < 2) {
    return { success: false }
  }

  return PartialProduct.safeParse(product)
}