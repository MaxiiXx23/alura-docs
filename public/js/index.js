import { getListDocument, createDocument } from './getListDocuments.js'
import { getCookie, removeCookie } from '../utils/cookies.js'

const socket = io({
  auth: {
    token: getCookie('token'),
  },
})

const listDocuments = document.getElementById('lista-documentos')
const formDocument = document.getElementById('form-adiciona-documento')
const inputDocument = document.getElementById('input-documento')
const btnLogout = document.getElementById('botao-logout')

function setLinkDocument(nameDocument, id) {
  listDocuments.innerHTML += `
        <a 
            href="./pages/document.html?id=${id}&nome=${nameDocument}"
            id="${id}"
            class="list-group-item list-group-item-action"
        >
            ${nameDocument}
        </a>

    `
}

async function removeLinkDocument(id) {
  const item = document.getElementById(id)
  listDocuments.removeChild(item)
}

async function generateListDocuments() {
  const list = await getListDocument()

  list.forEach((doc) => {
    setLinkDocument(doc.name, doc.id)
  })
}

formDocument.addEventListener('submit', async (event) => {
  event.preventDefault()
  if (!inputDocument.value) return
  await createDocument(socket, inputDocument.value)
  inputDocument.value = ''
})

btnLogout.addEventListener('click', () => {
  removeCookie('token')
  window.location.href = '/pages/login.html'
})

generateListDocuments()

socket.on('connect_error', (error) => {
  console.log(error)
  // window.location.href = '/pages/login.html'
})

socket.on('insertDocument', (document) => {
  setLinkDocument(document.name, document.id)
})

socket.on('deleteDocument', async (id) => {
  await removeLinkDocument(id)
})
