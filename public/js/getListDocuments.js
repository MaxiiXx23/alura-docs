const baseUrl = 'http://localhost:3000'
const socket = io()

async function getListDocument() {
  const list = await axios.get(`${baseUrl}/documents/list`)

  return list.data.data
}

async function createDocument(nameDocument) {
  let document

  socket.emit('insertDocument', nameDocument)

  return document
}

export { getListDocument, createDocument }
