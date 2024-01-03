interface IConnectionsDocuments {
  nameDocument: string
  userName: string
}

// O certo é adicionar esse conexão no banco de dados, pois, o dados se perdem se adicionados a variáveis do server

const connectionsDocuments: IConnectionsDocuments[] = []

function addConnectionDocument(payload: IConnectionsDocuments) {
  connectionsDocuments.push(payload)
}

function getConnectionsByDocument(nameDocument: string) {
  return connectionsDocuments
    .filter((connection) => connection.nameDocument === nameDocument)
    .map((connectionFiltered) => connectionFiltered.userName)
}

export { addConnectionDocument, getConnectionsByDocument }
