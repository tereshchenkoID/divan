import { types } from "store/actionTypes";
import {hostnames} from "constant/config";

const initialState = {
    socket: null,
    receivedMessage: '',
    isConnected: false,
};

const socketReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CONNECT_SOCKET:
            const socket = new WebSocket(hostnames.WSS_PROD)
            console.log("%cSOCKET_CONNECT", 'color: #157b15')

            return {
                ...state,
                socket,
                isConnected: socket.readyState,
            };

        case types.SEND_MESSAGE:
            console.log("%cSEND_MESSAGE", 'color: #0362b3')
            if (state.socket && state.socket.readyState === WebSocket.OPEN) {
                state.socket.send(JSON.stringify(action.payload));
            }

            return { ...state };

        case types.RECEIVE_MESSAGE:
            console.log("%cRECEIVE_MESSAGE", 'color: #e8b632')
            return {
                ...state,
                receivedMessage: JSON.parse(action.payload),
            };

        case types.DISCONNECT_SOCKET:
            console.log("%cSOCKET_DISCONNECT", 'color: #c91e37')
            return {...state, socket: null, isConnected: false};

        default:
            return state;
    }
};

export default socketReducer;
