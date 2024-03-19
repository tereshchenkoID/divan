import axios from 'axios'

import { getHostName } from 'helpers/getHostName'
import { getToken } from 'helpers/getToken'

export const useRequest = (type = 'account') => {
  const token = getToken()

  const server = axios.create({
    baseURL: `${getHostName()}/${type}/${token}`,
  })

  const get = async (url, headers) => {
    try {
      const req = await server({
        method: 'get',
        url,
        headers,
      })

      if (req.data.error_code === '-1') {
        localStorage.removeItem('authToken')
        return -1
      }

      return await req.data
    } catch (e) {
      return e.response
    }
  }

  const post = async (url, data, headers) => {
    try {
      const req = await server({
        method: 'post',
        url,
        data,
        headers,
      })
      return await req.data
    } catch (e) {
      return e.response
    }
  }

  return {
    get,
    post,
  }
}
