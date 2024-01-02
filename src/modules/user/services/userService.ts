import { IUserRegister } from '@/interfaces/user'
import { connectionBd } from '@/shared/provider'
import { generateHashPassword } from '@/utils/generateHashPassword'

export class UserService {
  async registerUser({ name, password }: IUserRegister) {
    try {
      const userAlreadyExists = await connectionBd.queryDatabase((prisma) =>
        prisma.user.findFirst({
          where: {
            name,
          },
        }),
      )

      if (userAlreadyExists) {
        throw new Error('User already exists.')
      }

      const passwordHash = await generateHashPassword(password)

      if (!passwordHash) {
        throw new Error('Error generate password hash.')
      }

      await connectionBd.queryDatabase((prisma) =>
        prisma.user.create({
          data: {
            name,
            password: passwordHash,
          },
        }),
      )
    } catch (error) {
      console.log('Error register user: ', error)
    }
  }
}
