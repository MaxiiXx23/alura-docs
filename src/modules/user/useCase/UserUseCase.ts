import { IUserRegister } from '@/interfaces/user'
import { UserService } from '../services/userService'

export class UserUseCase {
  private userService: UserService
  constructor() {
    this.userService = new UserService()
  }

  async registerUser({ name, password }: IUserRegister) {
    return await this.userService.registerUser({ name, password })
  }
}
