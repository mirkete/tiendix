import { Router } from "express"

export function createShopsRouter () {
  const shopsRouter = Router()

  shopsRouter.get("/", () => { "" })

  return shopsRouter
}