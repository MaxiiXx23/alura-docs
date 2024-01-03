import { getCookie } from '../../utils/cookies.js'
import {
  emitTextEditor,
  emitTyping,
  selectDocument,
} from './socket-front-document.js'

const socket = io('/users', {
  auth: {
    token: getCookie('token'),
  },
})

const params = new URLSearchParams(window.location.search)
const nameDocument = params.get('nome')
const idDocument = params.get('id')

const inputTextarea = document.getElementById('editor-texto')
const titleDocument = document.getElementById('titulo-documento')
const btnDeleteDocument = document.getElementById('excluir-documento')
const userTyping = document.getElementById('usuario-digitando')

titleDocument.textContent = nameDocument || 'Documento sem título'

selectDocument(nameDocument)

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

export { putTextEditor, setUserTyping }
