import { useDispatch, useSelector } from 'react-redux';
import { connectSocket, sendMessage, receiveMessage, disconnectSocket } from 'store/actions/socketAction';

const useSocket = () => {
    const dispatch = useDispatch();
    const { socket, receivedMessage, isConnected } = useSelector((state) => state.socket);

    const handleConnectSocket = () => {
        dispatch(connectSocket());
    };

    const handleSendMessage = (message) => {
        dispatch(sendMessage(message));
    };

    const handleReceiveMessage = () => {
        socket.onmessage = (event) => {
            dispatch(receiveMessage(event.data));
        }
    };

    const handleDisconnectSocket = () => {
        socket.onclose = () => {
            dispatch(disconnectSocket());
        }
    };

    const waitForConnection = (socket) => {
        return new Promise((resolve) => {
            if (socket.readyState === WebSocket.OPEN) {
                resolve();
            } else {
                const onOpen = () => {
                    resolve();
                    socket.removeEventListener('open', onOpen);
                };
                socket.addEventListener('open', onOpen);
            }
        });
    };

    return {
        socket,
        receivedMessage,
        isConnected,
        connectSocket: handleConnectSocket,
        sendMessage: handleSendMessage,
        receiveMessage: handleReceiveMessage,
        disconnectSocket: handleDisconnectSocket,
        waitForConnection
    };
};

export default useSocket;
