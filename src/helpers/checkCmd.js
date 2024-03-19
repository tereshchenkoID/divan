import { messages } from 'constant/config'

import { getToken } from './getToken'

export const checkCmd = (data, value) => {
  return value.indexOf(messages[data].replace('[]', getToken())) !== -1
}
