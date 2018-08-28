import axios from 'axios'

const createHost = () => {
  const instance = axios.create({
    baseURL: '/api'
  })

  // instance.interceptors.request.use(request => {
  //   console.log('request: ', request)
  // })
  instance.interceptors.response.use(response => {
    const customResponse = {
      ...response,
      url: response.request.url
    }

    if (!response.data.success) {
      return Promise.reject(customResponse)
    } else {
      return Promise.resolve(customResponse)
    }
  })

  return instance
}

export const host = createHost()
