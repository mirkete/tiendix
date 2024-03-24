export async function deleteProduct (repository, data) {
  const result = await repository.deleteProduct(data)

  return result
}