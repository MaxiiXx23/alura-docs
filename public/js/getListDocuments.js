const baseUrl = 'http://localhost:3000'

async function getListDocument() {
  const list = await axios.get(`${baseUrl}/documents/list`)

  return list.data.data
}

async function createDocument(socket, nameDocument) {
  let document

  socket.emit('insertDocument', nameDocument)

  return document
}

export { getListDocument, createDocument }
