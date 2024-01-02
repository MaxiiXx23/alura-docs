import { getListDocument, createDocument } from './getListDocuments.js'

const socket = io()

const listDocuments = document.getElementById('lista-documentos')
const formDocument = document.getElementById('form-adiciona-documento')
const inputDocument = document.getElementById('input-documento')

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
  await createDocument(inputDocument.value)
  inputDocument.value = ''
})

generateListDocuments()

socket.on('insertDocument', (document) => {
  setLinkDocument(document.name, document.id)
})

socket.on('deleteDocument', async (id) => {
  await removeLinkDocument(id)
})
