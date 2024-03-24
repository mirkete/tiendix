export async function getProducts (repository, data) {
  const result = await repository.getProducts(data)

  return result
}