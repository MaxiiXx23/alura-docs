import express from 'express'
import url from 'url'
import path from 'path'
import http from 'http'

import { Server } from 'socket.io'
import { routersApi } from './shared/routes/index.routes'

const app = express()
const port = process.env.PORT || 3000

const currentPath = url.fileURLToPath(import.meta.url)
const publicDir = path.join(currentPath, '../..', 'public')

app.use(express.json())
app.use(express.static(publicDir))
app.use(routersApi)

// Default config to Socket.io working with Express
const serverHttp = http.createServer(app)
const io = new Server(serverHttp)

serverHttp.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`),
)

export { io }
