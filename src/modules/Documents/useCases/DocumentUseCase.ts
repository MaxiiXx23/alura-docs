import { DocumentService } from '../services/DocumentService'

export class DocumentUseCase {
  private documentService: DocumentService
  constructor() {
    this.documentService = new DocumentService()
  }

  async getListDocument() {
    return await this.documentService.getListDocuments()
  }

  async getDocumentByName(nameDocument: string) {
    return await this.documentService.getDocument(nameDocument)
  }

  async createDocument(nameDocument: string) {
    return await this.documentService.createDocument(nameDocument)
  }

  async patchTextDocument(id: string, text: string) {
    return await this.documentService.patchTextDocument(id, text)
  }

  async deleteDocument(id: string) {
    return await this.documentService.deleteDocument(id)
  }
}
