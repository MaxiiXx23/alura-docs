import { compare } from 'bcrypt'

import { connectionBd } from '@/shared/provider'
import { generateHashPassword } from '@/utils/generateHashPassword'

import { IUserRegister } from '@/interfaces/user'
import { generateTokenAuthenticate } from '@/utils/token/generateTokenAuthenticate'

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

  async authenticateUser({ name, password }: IUserRegister) {
    try {
      const hasUser = await connectionBd.queryDatabase((prisma) =>
        prisma.user.findFirst({
          where: {
            name,
          },
        }),
      )

      if (!hasUser) {
        throw new Error('User not found or password incorret.')
      }

      const matchPassword = await compare(password, hasUser.password)

      if (!matchPassword) {
        throw new Error('User not found or password incorret.')
      }

      const token = generateTokenAuthenticate(name)

      return {
        token,
      }
    } catch (error) {
      throw new Error('Error authenticate')
    }
  }
}
