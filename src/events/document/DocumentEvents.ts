import { Socket, Namespace } from 'socket.io'

import { DocumentUseCase } from '@/modules/Documents/useCases/DocumentUseCase'
import { IOnTextEditorProps } from '@/interfaces/document'
import {
  addConnectionDocument,
  getConnectionsByDocument,
} from '@/utils/connectionsDocument'

// Classe responsável por abrigar a refatoração dos eventos do websocket

interface IPayloadGetDocument {
  nameDocument: string
  userName: string
}

export class DocumentEvents {
  private documentUseCase: DocumentUseCase

  constructor() {
    this.documentUseCase = new DocumentUseCase()
  }

  // Agora "io" recebe o type "Namespace" pois, agora o caminho é informado pelo namespace  e não pelo server (namespace padrão "/")

  async insertDocumentEvent(socket: Socket, io: Namespace) {
    // Aqui estou "escutando" o evento emitido pelo cliente, quando o mesmo está conectado.

    socket.on('insertDocument', async (nameDocument) => {
      // Aqui fazer um insert em real time com o websocket

      const createdDocument =
        await this.documentUseCase.createDocument(nameDocument)

      io.emit('insertDocument', createdDocument)
    })
  }

  async patchDocumentTextEvent(socket: Socket) {
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
        await this.documentUseCase.patchTextDocument(id, payload)
        // Aqui estou emitindo um evento para o a sala/grupo 'javaScript' não para os demais clientes ou salas/grupo
        socket.broadcast.to(nameDocument).emit('textEditorClients', payload)
      },
    )
  }

  async deleteDocumentEvent(socket: Socket, io: Namespace) {
    socket.on('deleteDocument', async (id) => {
      await this.documentUseCase.deleteDocument(id)
      io.emit('deleteDocument', id)
    })
  }

  async getDocumentEvent(socket: Socket, io: Namespace) {
    socket.on(
      'selectDocument',
      async ({ nameDocument, userName }: IPayloadGetDocument, cbReturnText) => {
        // o método 'join' serve para agruparmos clientes conectados a uma 'sala'

        const document =
          await this.documentUseCase.getDocumentByName(nameDocument)

        if (document) {
          socket.join(nameDocument)

          addConnectionDocument({ nameDocument, userName })

          const usersConnectedOnDocument =
            getConnectionsByDocument(nameDocument)
          /*
          // 1° forma de emitir dados, assim que logados/conectamos na aplicação/servidor
          socket.emit('foundTextDocument', document.text)
        */

          // 2° forma é retornar uma callback que retornará dados ao cliente ao escutar o evento
          // Recurso: Acknowledgment de websockets
          io.to(nameDocument).emit('usersConnected', usersConnectedOnDocument)
          return cbReturnText(document.text)
        }
      },
    )
  }

  async userTypingEvent(socket: Socket) {
    socket.on('userTyping', (nameDocument) => {
      socket.broadcast.to(nameDocument).emit('userTyping', socket.id)
    })

    socket.on('stopUserTyping', (nameDocument) => {
      socket.broadcast.to(nameDocument).emit('stopUserTyping')
    })
  }
}
