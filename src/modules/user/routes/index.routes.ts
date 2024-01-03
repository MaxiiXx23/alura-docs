import express from 'express'
import { UserController } from '../controllers/UserController'

const routerUser = express.Router()

const userController = new UserController()

routerUser.post('/register', userController.registerUser)
routerUser.post('/auth', userController.authenticateUser)

export { routerUser }
