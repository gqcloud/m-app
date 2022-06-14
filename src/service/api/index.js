import request from "../request/request"
export const getAllChannelsAPI = () =>
  request({
    url: "/v1_0/channels"
  })

export const loginAPI = (mobile, code) =>
  request({
    url: "/v1_0/authorizations",
    method: "post",
    data: {
      mobile,
      code
    }
  })
