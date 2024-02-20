import { types } from 'store/actionTypes'

export const connectSocket = message => ({
  type: types.CONNECT_SOCKET,
  payload: message,
})

export const sendMessage = message => ({
  type: types.SEND_MESSAGE,
  payload: message,
})

export const receiveMessage = message => ({
  type: types.RECEIVE_MESSAGE,
  payload: message,
})

export const disconnectSocket = () => ({
  type: types.DISCONNECT_SOCKET,
})
