import dotenv from 'dotenv'

import { DocumentEvents } from './events/document/DocumentEvents'
import { io } from './server'

dotenv.config()

io.on('connection', (socket) => {
  // Aqui estou "escutando" o evento emitido pelo cliente, quando o mesmo está conectado.

  const documentEvents = new DocumentEvents()

  documentEvents.getDocumentEvent(socket)
  documentEvents.insertDocumentEvent(socket, io)
  documentEvents.patchDocumentTextEvent(socket)
  documentEvents.userTypingEvent(socket)
  documentEvents.deleteDocumentEvent(socket, io)
})
