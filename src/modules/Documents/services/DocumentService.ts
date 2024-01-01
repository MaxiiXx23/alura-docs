import { connectionBd } from '@/shared/provider'

export class DocumentService {
  async getDocument(nameDocument: string) {
    try {
      const foundDocument = await connectionBd.queryDatabase((prisma) =>
        prisma.document.findFirst({
          where: {
            name: nameDocument,
          },
          select: {
            id: true,
            name: true,
            text: true,
          },
        }),
      )

      return foundDocument
    } catch (error) {
      console.log('Error BD: ', error)
    }
  }

  async patchTextDocument(id: string, text: string) {
    try {
      const hasDocument = await connectionBd.queryDatabase((prisma) =>
        prisma.document.findFirst({
          where: {
            id,
          },
        }),
      )

      if (!hasDocument) {
        throw new Error('Document not found.')
      }

      const updatedDocument = await connectionBd.queryDatabase((prisma) =>
        prisma.document.update({
          where: {
            id,
          },
          data: {
            text,
          },
        }),
      )

      return updatedDocument
    } catch (error) {
      console.log('Error BD: ', error)
    }
  }

  async getListDocuments() {
    try {
      const listDocuments = await connectionBd.queryDatabase((prisma) =>
        prisma.document.findMany({
          select: {
            id: true,
            name: true,
            text: true,
          },
        }),
      )

      return listDocuments
    } catch (error) {
      console.log('Error BD: ', error)
    }
  }

  async createDocument(nameDocument: string) {
    try {
      const hasDocument = await connectionBd.queryDatabase((prisma) =>
        prisma.document.findFirst({
          where: {
            name: nameDocument,
          },
        }),
      )

      if (hasDocument) {
        throw new Error('Document already exists. Please, try another name.')
      }

      const createdDocument = await connectionBd.queryDatabase((prisma) =>
        prisma.document.create({
          data: {
            name: nameDocument,
            text: '',
          },
        }),
      )

      return createdDocument
    } catch (error) {
      console.log(`Error BD: `, error)
    }
  }

  async deleteDocument(id: string) {
    try {
      const hasDocument = await connectionBd.queryDatabase((prisma) =>
        prisma.document.findUnique({
          where: {
            id,
          },
        }),
      )

      if (!hasDocument) {
        throw new Error('Document not found. Please, try again.')
      }

      const deletedDocument = await connectionBd.queryDatabase((prisma) =>
        prisma.document.delete({
          where: {
            id,
          },
        }),
      )

      return deletedDocument
    } catch (error) {
      console.log(`Error BD: `, error)
    }
  }
}
