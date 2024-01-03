import { getCookie } from '../utils/cookies.js'
import { io } from 'https://cdn.socket.io/4.7.2/socket.io.esm.min.js'

export const socket = io('/users', {
  auth: {
    token: getCookie('token'),
  },
})
