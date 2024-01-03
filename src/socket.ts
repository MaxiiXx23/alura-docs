import dotenv from 'dotenv'

import { DocumentEvents } from './events/document/DocumentEvents'
import { io } from './server'
import { ensureTokenMiddleware } from './shared/middlewares/events/ensureTokenMiddleware'

dotenv.config()

// Middleware(global-Para todas as "rotas" do socket) usado para autorizar o usuário a se conectar ao websocket
io.use(ensureTokenMiddleware)

io.on('connection', (socket) => {
  // Aqui estou "escutando" o evento emitido pelo cliente, quando o mesmo está conectado.

  const documentEvents = new DocumentEvents()

  documentEvents.getDocumentEvent(socket)
  documentEvents.insertDocumentEvent(socket, io)
  documentEvents.patchDocumentTextEvent(socket)
  documentEvents.userTypingEvent(socket)
  documentEvents.deleteDocumentEvent(socket, io)
})
