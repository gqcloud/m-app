import request from "../request/request"
import LocalCache from "@/utils/cache"
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

export const getUserChannel = () =>
  request({
    url: "/v1_0/user/channels",
    headers: {
      Authorization: `Bearer ${LocalCache.getCache("token")}`
    }
  })

export const getArticle = ({ channel_id, timestamp }) =>
  request({
    url: `/v1_0/articles`,
    headers: {
      Authorization: `Bearer ${LocalCache.getCache("token")}`
    },
    params: {
      channel_id,
      timestamp
    }
  })
