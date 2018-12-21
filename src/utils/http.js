import axios from 'axios'
import Vue from 'vue'

const v = new Vue()
const createHost = () => {
  const instance = axios.create({
    baseURL: '/api'
  })

  instance.interceptors.request.use(request => {
    let token = sessionStorage.getItem('token')
    if (!request.headers.Authorization && token) {
      request.headers.Authorization = token
    }
    return request
  })

  instance.interceptors.response.use(response => {
    const customResponse = {
      ...response,
      url: response.request.url
    }

    if (!response.data.success) {
      let message = response.data.message,
          me = message || '请求出错!'
      v.$message({
        message: me
      })
      return Promise.reject(customResponse)
    } else {
      return Promise.resolve(response.data)
    }
  })

  return instance
}

export const host = createHost()
