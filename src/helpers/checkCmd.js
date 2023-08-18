import {messages} from "../constant/config";

export const checkCmd = (data, value) => {
    return messages[data].replace('[]', sessionStorage.getItem('authToken')) === value
}

export default checkCmd
