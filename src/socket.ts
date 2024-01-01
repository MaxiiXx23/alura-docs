import { io } from './server'
import { DocumentService } from './modules/Documents/services/DocumentService'

import { DocumentUseCase } from './modules/Documents/useCases/DocumentUseCase'

interface IOnTextEditorProps {
  id: string
  payload: string
  nameDocument: string
}

const documentUseCase = new DocumentUseCase()

io.on('connection', (socket) => {
  // console.log('a user connected, id: ', socket.id)

  // Aqui estou "escutando" o evento emitido pelo cliente, quando o mesmo está conectado.

  socket.on('insertDocument', async (nameDocument) => {
    // Aqui fazer um insert em real time com o websocket

    const createdDocument = await documentUseCase.createDocument(nameDocument)

    io.emit('insertDocument', createdDocument)
  })

  socket.on('deleteDocument', async (id) => {
    await documentUseCase.deleteDocument(id)
    io.emit('deleteDocument', id)
  })

  socket.on('selectDocument', async (nameDocument, cbReturnText) => {
    // o método 'join' serve para agruparmos clientes conectados a uma 'sala'
    socket.join(nameDocument)

    const documetService = new DocumentService()

    const document = await documetService.getDocument(nameDocument)

    if (document) {
      /*
        // 1° forma de emitir dados, assim que logados/conectamos na aplicação/servidor
        socket.emit('foundTextDocument', document.text)
      */

      // 2° forma é retornar uma callback que retornará dados ao cliente ao escutar o evento
      // Recurso: Acknowledgment de websockets
      return cbReturnText(document.text)
    }
  })

  socket.on('userTyping', (nameDocument) => {
    socket.broadcast.to(nameDocument).emit('userTyping', socket.id)
  })

  socket.on('stopUserTyping', (nameDocument) => {
    socket.broadcast.to(nameDocument).emit('stopUserTyping')
  })

  socket.on(
    'textEditor',
    async ({ id, payload, nameDocument }: IOnTextEditorProps) => {
      /* 
          Com o método 'emit' emitirei um evento para TODOS os clientes logados.
          io.emit('textEditorClients', payload)
          socket.broadcast.emit(), podemos emitir para todos os clientes, exceto o cliente que está emitindo o evento.
          socket.broadcast.emit('textEditorClients', payload)
    */

      // const document = findTextDocument(nameDocument)
      await documentUseCase.patchTextDocument(id, payload)
      // Aqui estou emitindo um evento para o a sala/grupo 'javaScript' não para os demais clientes ou salas/grupo
      socket.broadcast.to(nameDocument).emit('textEditorClients', payload)
    },
  )
})
