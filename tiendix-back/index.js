import express from 'express'
import path from 'node:path'
import { createApiRouter } from './routes/apiRouter.js'
import {cors} from "./middlewares/cors.js"

const app = express()

// Middlewares
app.use(express.static(path.join(process.cwd(), 'views')))
app.use(express.json())
app.use(cors())

// Routes
app.use('/api', createApiRouter())

app.listen(3001, () => {
  console.log('Server working on: http://localhost:3001/')
})
