import dotenv from 'dotenv'

import { DocumentEvents } from './events/document/DocumentEvents'
import { io } from './server'
import { ensureTokenMiddleware } from './shared/middlewares/events/ensureTokenMiddleware'

dotenv.config()

// Cada Namespace(rota) possui seus middlewares, events e configs individuais, assim, não influenciando outros namespaces criados ou o principal("/")

const nspUser = io.of('/users')

nspUser.use(ensureTokenMiddleware)

nspUser.on('connection', (socket) => {
  // Aqui estou "escutando" o evento emitido pelo cliente, quando o mesmo está conectado.

  const documentEvents = new DocumentEvents()

  documentEvents.getDocumentEvent(socket)
  documentEvents.insertDocumentEvent(socket, nspUser)
  documentEvents.patchDocumentTextEvent(socket)
  documentEvents.userTypingEvent(socket)
  documentEvents.deleteDocumentEvent(socket, nspUser)
})

/*

  // Middleware(global-Para todas as "rotas" do socket) usado para autorizar o usuário a se conectar ao websocket
  io.use(ensureTokenMiddleware)

  // Esse é o namespace PRINCIPAL("/" <- "endoint")
  // Um Namespace é um canal(rota) de comunicação que permite dividir a lógica do seu aplicativo em uma única conexão compartilhada
  io.on('connection', (socket) => {
    // Aqui estou "escutando" o evento emitido pelo cliente, quando o mesmo está conectado.

    const documentEvents = new DocumentEvents()

    documentEvents.getDocumentEvent(socket)
    documentEvents.insertDocumentEvent(socket, io)
    documentEvents.patchDocumentTextEvent(socket)
    documentEvents.userTypingEvent(socket)
    documentEvents.deleteDocumentEvent(socket, io)
  })

*/
