import { messages } from 'constant/config'

export const checkCmd = (data, value) => {
  return value.indexOf(messages[data].replace('[]', sessionStorage.getItem('authToken'))) !== -1
}
