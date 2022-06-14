let BASE_URL = ""
let TIME_OUT = ""
if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://toutiao.itheima.net"
  TIME_OUT = 2000
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "/pro"
  TIME_OUT = 2000
} else {
  BASE_URL = "/test"
  TIME_OUT = 2000
}
export { BASE_URL, TIME_OUT }
