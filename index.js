import express from 'express'
import path from 'node:path'
import { createApiRouter } from './routes/apiRouter.js'
import { ShopsModel } from './models/shopsModel.js'

const app = express()

// Middlewares
app.use(express.static(path.join(process.cwd(), 'views')))

// Routes
app.use('/api', createApiRouter({ model: ShopsModel }))

app.listen(3000, () => {
  console.log('Server working on: http://localhost:3000/')
})
