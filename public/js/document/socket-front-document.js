// Se o frontend estiver em outra 'url', devemos informa-la à função 'io'
// const socket = io("http://localhost:3000");

import { socket } from '../connectionSocket.js'
import {
  putTextEditor,
  setUserTyping,
  tryConnectionSuccess,
  changeInterfaceUsersOnline,
} from './document.js'

let typingTimer
const typingTimeout = 1000 // Tempo em milissegundos para determinar que o usuário parou de digitar

// Aqui emito um evento enviado o nome do document selecionado pelo usuário, afim de separar o envio de mensagens(eventos) por documento.
function selectDocument(payload) {
  // 2°forma: Recuperação dados devolvidos pelo servidor, através de uma callback(cb) dentro do evento
  socket.emit('selectDocument', payload, (data) => {
    putTextEditor(data)
  })
}

function emitTextEditor(data) {
  socket.emit('textEditor', {
    id: data.id,
    payload: data.text,
    nameDocument: data.nameDocument,
  })
}

function emitTyping(nameDocument) {
  clearTimeout(typingTimer)
  const userName = localStorage.getItem('userName')
  socket.emit('userTyping', { nameDocument, userName })
  typingTimer = setTimeout(() => {
    socket.emit('stopUserTyping', nameDocument)
  }, typingTimeout)
}

function emitUserDisconnectDocument(payload) {
  socket.emit('userDisconnectDocument', payload)
}

/* 
  // 1° forma de recuperar dados, assim que logados/conectamos na aplicação/servidor
  // Assim que o usuário seleciona um documento, ele recebe/escuta o event que trará as informações já salvas do documento
  socket.on('foundTextDocument', (data) => {
    putTextEditor(data)
})

*/

socket.on('connect_error', () => {
  window.location.href = '/pages/login.html'
})

socket.on('connectionSucess', tryConnectionSuccess)

socket.on('usersConnected', changeInterfaceUsersOnline)

socket.on('textEditorClients', (data) => {
  putTextEditor(data)
})

socket.on('userTyping', (userName) => {
  const text = `${userName} está digitando...`
  setUserTyping(text)
})

socket.on('stopUserTyping', () => {
  setUserTyping('')
})

socket.on('userAlreadyConnected', () => {
  alert('Another tab open on the same document.')
  window.location.href = '/'
})

export {
  emitTextEditor,
  selectDocument,
  emitTyping,
  emitUserDisconnectDocument,
}
