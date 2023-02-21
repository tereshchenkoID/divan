import axios from 'axios'

import {hostnames} from "constant/config"

export const useRequest = () => {
  const server = axios.create({
    baseURL: `${hostnames.PROD}`,
  })

  const get = async (url, headers) => {
    try {
      const req = await server({
        method: 'get',
        url: url,
        headers: headers
      })

      return await req.data
    } catch (e) {
      return e.response.status
    }
  }

  const post = async (url, data, headers) => {
    try {
      const req = await server({
        method: 'post',
        url: url,
        data: data,
        headers: headers
      })

      return await req.data
    } catch (e) {
      return e.response.status
    }
  }

  return {
    get,
    post,
  }
}
