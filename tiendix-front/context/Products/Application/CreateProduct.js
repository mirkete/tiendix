export async function createProduct (repository, data) {
  const result = await repository.createProduct(data)
  return result
}