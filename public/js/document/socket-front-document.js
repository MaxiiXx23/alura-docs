// Se o frontend estiver em outra 'url', devemos informa-la à função 'io'
// const socket = io("http://localhost:3000");

import { getCookie } from '../../utils/cookies.js'
import { putTextEditor, setUserTyping } from './document.js'

const socket = io({
  auth: {
    token: getCookie('token'),
  },
})

let typingTimer
const typingTimeout = 1000 // Tempo em milissegundos para determinar que o usuário parou de digitar

// Aqui emito um evento enviado o nome do document selecionado pelo usuário, afim de separar o envio de mensagens(eventos) por documento.
function selectDocument(nome) {
  // 2°forma: Recuperação dados devolvidos pelo servidor, através de uma callback(cb) dentro do evento
  socket.emit('selectDocument', nome, (data) => {
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
  socket.emit('userTyping', nameDocument)
  typingTimer = setTimeout(() => {
    socket.emit('stopUserTyping', nameDocument)
  }, typingTimeout)
}

/* 
  // 1° forma de recuperar dados, assim que logados/conectamos na aplicação/servidor
  // Assim que o usuário seleciona um documento, ele recebe/escuta o event que trará as informações já salvas do documento
  socket.on('foundTextDocument', (data) => {
    putTextEditor(data)
})

*/

socket.on('connect_error', (error) => {
  console.log(error)
  window.location.href = '/pages/login.html'
})

socket.on('textEditorClients', (data) => {
  putTextEditor(data)
})

socket.on('userTyping', (idSocket) => {
  const text = `Usuário: ${idSocket} está digitando...`
  setUserTyping(text)
})

socket.on('stopUserTyping', () => {
  setUserTyping('')
})

export { emitTextEditor, selectDocument, emitTyping }
