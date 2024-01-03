import express from 'express'
import { routerDocuments } from '@/modules/Documents/routes/index.routes'
import { routerUser } from '@/modules/user/routes/index.routes'

const routersApi = express.Router()

routersApi.use('/documents', routerDocuments)
routersApi.use('/user', routerUser)

export { routersApi }
