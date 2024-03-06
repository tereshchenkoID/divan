import { messages } from 'constant/config'

export const checkCmd = (data, value) => {
  return value.indexOf(messages[data].replace('[]', localStorage.getItem('authToken'))) !== -1
}
