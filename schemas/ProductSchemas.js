import { z } from 'zod'

const UUID = z.object({
  id: z.string().uuid()
})

export function checkUUID ({ id }) {
  return UUID.safeParse({ id })
}
