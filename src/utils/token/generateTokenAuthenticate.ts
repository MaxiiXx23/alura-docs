import jwt from 'jsonwebtoken'

export function generateTokenAuthenticate(name: string) {
  const expiresIn = process.env.EXPIRES_IN_TOKEN
  const token = jwt.sign(
    {
      name,
    },
    process.env.TOKEN_SECRET as string,
    {
      expiresIn,
    },
  )

  return token
}
