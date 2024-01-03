import { socket } from '../connectionSocket.js'

import {
  emitTextEditor,
  emitTyping,
  selectDocument,
  emitUserDisconnectDocument,
} from './socket-front-document.js'

const params = new URLSearchParams(window.location.search)
const nameDocument = params.get('nome')
const idDocument = params.get('id')

const inputTextarea = document.getElementById('editor-texto')
const titleDocument = document.getElementById('titulo-documento')
const btnDeleteDocument = document.getElementById('excluir-documento')
const userTyping = document.getElementById('usuario-digitando')
const listUsersOnline = document.getElementById('usuarios-conectados')
const btnBack = document.getElementById('botao-voltar')

titleDocument.textContent = nameDocument || 'Documento sem título'

function tryConnectionSuccess(payloadToken) {
  localStorage.setItem('userName', `${payloadToken.name}`)
  selectDocument({ nameDocument, userName: payloadToken.name })
}

function changeInterfaceUsersOnline(usersConnected) {
  listUsersOnline.innerHTML = ''

  usersConnected.forEach((user) => {
    listUsersOnline.innerHTML += `
      <li class="list-group-item">${user}</li>
    `
  })
}

inputTextarea.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    emitTextEditor({
      id: idDocument,
      text: inputTextarea.value,
      nameDocument,
    })
  } else {
    emitTyping(nameDocument)
  }
})

btnBack.addEventListener('click', () => {
  const userName = localStorage.getItem('userName')

  emitUserDisconnectDocument({ nameDocument, userName })
})

function deleteDocument(id) {
  socket.emit('deleteDocument', id)
}

function putTextEditor(text) {
  inputTextarea.value = text
}

function setUserTyping(text) {
  userTyping.innerHTML = text
}

btnDeleteDocument.addEventListener('click', () => {
  deleteDocument(idDocument)
})

socket.on('deleteDocument', async (id) => {
  if (idDocument === id) {
    window.location.href = '/'
  }
})

export {
  putTextEditor,
  setUserTyping,
  tryConnectionSuccess,
  changeInterfaceUsersOnline,
}
