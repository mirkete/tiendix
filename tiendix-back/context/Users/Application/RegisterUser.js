export async function registerUser (repository, data) {
  const result = await repository.registerUser(data)

  return result
}