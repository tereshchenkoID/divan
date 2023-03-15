import axios from 'axios'

import {hostnames} from "constant/config"

export const useRequest = (type = 'account') => {
  const token = window.sessionStorage.getItem('authToken')

  const server = axios.create({
    baseURL: `${hostnames.PROD}/${type}/${token}`,
  })

  const get = async (url, headers) => {
    try {
      const req = await server({
        method: 'get',
        url: url,
        headers
      })
      return await req.data
    } catch (e) {
      return e.response.status
    }
  }

  const post = async (url, data, headers, options) => {
    console.log(headers, options)

    try {
      const req = await server({
        method: 'post',
        url: url,
        data: data,
        headers: headers
      })

      console.log(server)

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
