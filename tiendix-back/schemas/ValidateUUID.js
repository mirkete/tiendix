import { z } from "zod"

const UUID = z.object({
  id: z.string().uuid()
})

export async function validateUUID (data) {
  return UUID.safeParse(data)
}