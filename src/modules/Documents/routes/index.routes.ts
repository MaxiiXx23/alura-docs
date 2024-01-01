import express from 'express'
import { DocumentController } from '../controllers/DocumentsController'

const routerDocuments = express.Router()

const documentController = new DocumentController()

routerDocuments.get('/list', documentController.getListDocuments)

export { routerDocuments }
