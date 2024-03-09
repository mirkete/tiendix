export async function updateProduct (repository, data) {
  const result = await repository.updateProduct(data)

  return result
}