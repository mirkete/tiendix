export async function logUser (repository, data) {
  const result = await repository.logUser(data)
  return result
}