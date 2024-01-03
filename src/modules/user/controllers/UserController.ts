import { Request, Response } from 'express'
import { UserUseCase } from '../useCase/UserUseCase'

export class UserController {
  async registerUser(
    request: Request,
    response: Response,
    // next: NextFunction
  ) {
    try {
      const { name, password } = request.body

      const userUseCase = new UserUseCase()

      await userUseCase.registerUser({ name, password })

      return response.status(201).json({
        message: 'User creted with sucessfully.',
      })
    } catch (error) {
      return response.status(500).json({
        message: `Error on server: ${error}`,
      })
    }
  }

  async authenticateUser(
    request: Request,
    response: Response,
    // next: NextFunction
  ) {
    try {
      const { name, password } = request.body

      const userUseCase = new UserUseCase()

      const { token } = await userUseCase.authenticate({ name, password })

      return response.status(201).json({
        token,
        message: 'User authenticated with sucessfully.',
      })
    } catch (error) {
      return response.status(500).json({
        message: `Error on server: ${error}`,
      })
    }
  }
}
