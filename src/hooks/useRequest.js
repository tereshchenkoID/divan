import axios from 'axios'
import { getHostName } from 'helpers/getHostName'
import { getToken } from 'helpers/getToken'

const createServer = (type = 'account') => {
  const token = getToken()

  return axios.create({
    baseURL: `${getHostName()}/${type}/${token}`,
  })
}

export const getData = async (url, headers, type = 'account') => {
  const server = createServer(type)
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

    return req.data
  } catch (e) {
    return e.response
  }
}

export const postData = async (url, data, headers, type = 'account') => {
  const server = createServer(type)
  try {
    const req = await server({
      method: 'post',
      url,
      data,
      headers,
    })

    return req.data
  } catch (e) {
    return e.response
  }
}

// export const useRequest = () => {
//   return {
//     getData,
//     postData,
//   }
// }
