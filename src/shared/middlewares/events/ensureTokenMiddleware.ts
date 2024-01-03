import { Socket } from 'socket.io'
import jwt from 'jsonwebtoken'

import { ExtendedError } from 'socket.io/dist/namespace'

export function ensureTokenMiddleware(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void,
) {
  try {
    const token = socket.handshake.auth.token

    const tokenVerified = jwt.verify(token, process.env.TOKEN_SECRET as string)
    socket.emit('connectionSucess', tokenVerified)
    next()
  } catch (error) {
    next(error as Error)
  }
}
