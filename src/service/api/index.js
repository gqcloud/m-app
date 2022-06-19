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

export const getUserChannel = () =>
  request({
    url: "/v1_0/user/channels"
  })

export const getArticle = ({ channel_id, timestamp }) =>
  request({
    url: `/v1_0/articles`,

    params: {
      channel_id,
      timestamp
    }
  })

export const dislikeArticle = (target) =>
  request({
    url: "/v1_0/article/dislikes",
    method: "post",

    data: {
      target
    }
  })

export const reportArticle = (target, type, remark = "1") =>
  request({
    url: "/v1_0/article/reports",
    method: "post",

    data: {
      target,
      type,
      remark
    }
  })

export const updateUserchannels = (channels) =>
  request({
    url: "/v1_0/user/channels",
    method: "put",
    data: {
      channels
    }
  })

export const removeChannels = (channel_id) =>
  request({
    url: `/v1_0/user/channels/${channel_id}`,
    method: "delete"
  })

export const searchList = (q) =>
  request({
    url: "/v1_0/suggestion",
    params: {
      q
    }
  })

export const searchResult = ({ page = 1, per_page = 10, q }) =>
  request({
    url: "/v1_0/search",
    params: {
      page,
      per_page,
      q
    }
  })

export const articleDetail = ({ article_id }) =>
  request({
    url: `/v1_0/articles/${article_id}`
  })

export const followUser = (target) =>
  request({
    url: "/v1_0/user/followings",
    method: "post",
    data: {
      target
    }
  })

export const unFollowUser = (target) =>
  request({
    url: `/v1_0/user/followings/${target}`,
    method: "delete"
  })

export const likeArticle = ({ target }) =>
  request({
    url: "/v1_0/article/likings",
    method: "post",
    data: {
      target
    }
  })

export const disLikeArticle = ({ target }) =>
  request({
    url: `/v1_0/article/likings/${target}`,
    method: "delete"
  })

export const commentList = ({
  type = "a",
  source,
  offset = null,
  limit = 10
}) =>
  request({
    url: "/v1_0/comments",
    params: {
      type,
      source,
      offset,
      limit
    }
  })

export const linkingComment = ({ target }) =>
  request({
    url: "/v1_0/comment/likings",
    method: "post",
    data: {
      target
    }
  })

export const disLikingComment = ({ target }) =>
  request({
    url: `/v1_0/comment/likings/${target}`,
    method: "delete"
  })

export const sendComment = (target, content, art_id = null) =>
  request({
    url: "/v1_0/comments",
    method: "post",
    data: {
      target,
      content,
      art_id
    }
  })
