import axios from "axios"
import { BASE_URL, TIME_OUT } from "./config"
import router from "@/router"
import { Toast } from "vant"
import LocalCache from "@/utils/cache"
const request = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

request.interceptors.request.use(
  function (config) {
    const token = LocalCache.getCache("token")
    if (token) {
      config.headers.Authorization = "Bearer " + token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      Toast.success("身份已过期，请重新登录")
      router.replace({ path: "/login" })
    }
    return Promise.reject(error)
  }
)
export default request
