import { Request, Response } from 'express'
import { DocumentUseCase } from '../useCases/DocumentUseCase'

export class DocumentController {
  async getListDocuments(
    request: Request,
    response: Response,
    // next: NextFunction,
  ): Promise<Response | void> {
    try {
      const documentUseCase = new DocumentUseCase()

      const list = await documentUseCase.getListDocument()

      return response.status(200).json({
        data: list,
      })
    } catch (error) {
      return response.status(500).json({
        message: `Error on server: ${error}`,
      })
    }
  }
}
