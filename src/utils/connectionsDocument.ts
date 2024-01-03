interface IConnectionsDocuments {
  nameDocument: string
  userName: string
}

// O certo é adicionar esse conexão no banco de dados, pois, o dados se perdem se adicionados a variáveis do server

const connectionsDocuments: IConnectionsDocuments[] = []

function getUserAlreadyConnectedOnDocument({
  nameDocument,
  userName,
}: IConnectionsDocuments) {
  return connectionsDocuments.find(
    (connection) =>
      connection.nameDocument === nameDocument &&
      connection.userName === userName,
  )
}

function addConnectionDocument(payload: IConnectionsDocuments) {
  connectionsDocuments.push(payload)
}

function getConnectionsByDocument(nameDocument: string) {
  return connectionsDocuments
    .filter((connection) => connection.nameDocument === nameDocument)
    .map((connectionFiltered) => connectionFiltered.userName)
}

function removeConnectionFromDocument({
  nameDocument,
  userName,
}: IConnectionsDocuments) {
  const indexToRemove = connectionsDocuments.findIndex(
    (connection) =>
      connection.nameDocument === nameDocument &&
      connection.userName === userName,
  )
  if (indexToRemove !== -1) {
    connectionsDocuments.splice(indexToRemove, 1)
  }
}

export {
  addConnectionDocument,
  getConnectionsByDocument,
  removeConnectionFromDocument,
  getUserAlreadyConnectedOnDocument,
}
