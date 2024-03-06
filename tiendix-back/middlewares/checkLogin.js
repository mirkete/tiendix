import jwt from 'jsonwebtoken'
import 'dotenv/config.js'

const privateKey = process.env.PRIVATE_KEY

export function checkLogin () {
  return (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1]
    try {
      const payload = jwt.verify(token, privateKey)
      const { id, shopId } = payload
      res.locals = { ...res.locals, id, shopId }
      next()
    } catch (e) {
      res.status(500).send('Invalid token')
    }
  }
}
