import { useDispatch, useSelector } from 'react-redux'
import { connectSocket, sendMessage, receiveMessage, disconnectSocket } from 'store/HOME/actions/socketAction'
import { getHostName } from 'helpers/getHostName'

const useSocket = () => {
  const dispatch = useDispatch()
  const { socket, receivedMessage } = useSelector(state => state.socket)

  const handleConnectSocket = hostname => {
    const newSocket = new WebSocket(getHostName('WSS_PROD'))

    newSocket.addEventListener('open', () => {
      dispatch(connectSocket(newSocket))
    })

    newSocket.addEventListener('message', event => {
      dispatch(receiveMessage(event.data))
    })

    newSocket.addEventListener('close', () => {
      dispatch(disconnectSocket())
    })

    newSocket.addEventListener('error', error => {
      dispatch(disconnectSocket())
    })
  }

  const handleSendMessage = message => {
    dispatch(sendMessage(message))
  }

  return {
    socket,
    receivedMessage,
    connectSocket: handleConnectSocket,
    sendMessage: handleSendMessage,
  }
}

export default useSocket
