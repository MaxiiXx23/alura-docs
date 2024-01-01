import express from 'express'
import { routerDocuments } from '@/modules/Documents/routes/index.routes'

const routersApi = express.Router()

routersApi.use('/documents', routerDocuments)

export { routersApi }
