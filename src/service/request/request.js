import axios from "axios"
import { BASE_URL, TIME_OUT } from "./config"
const request = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default request
