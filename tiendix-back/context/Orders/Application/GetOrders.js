export async function getOrders (repository, data) {
  const result = await repository.getOrders(data)

  return result
}