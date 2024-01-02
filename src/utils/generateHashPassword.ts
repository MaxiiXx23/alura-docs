import { hash } from 'bcrypt'

export async function generateHashPassword(password: string) {
  try {
    const salt = 8
    const passwordHash = await hash(password, salt)
    return passwordHash
  } catch {
    console.log('Error to generate hash password')
  }
}
