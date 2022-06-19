<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ artObj.title }}</h1>

      <!-- 用户信息 -->
      <van-cell center title="未知" :label="timeAgo(artObj.pubdate)">
        <template #icon>
          <img :src="artObj.aut_photo" alt="" class="avatar" />
        </template>
        <template #default>
          <div>
            <van-button
              type="info"
              size="mini"
              v-if="artObj.is_followed"
              @click="folllow(true)"
              >已关注</van-button
            >
            <van-button
              icon="plus"
              type="info"
              size="mini"
              plain
              v-else
              @click="folllow(false)"
              >关注</van-button
            >
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="artObj.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button
          icon="good-job"
          type="danger"
          size="small"
          v-if="artObj.attitude === '1'"
          @click="thumbsUp(true)"
          >已点赞</van-button
        >
        <van-button
          icon="good-job-o"
          type="danger"
          plain
          size="small"
          v-else
          @click="thumbsUp(false)"
          >点赞</van-button
        >
      </div>
    </div>

    <!-- 文章评论区 -->
    <!-- <comment-list></comment-list> -->
  </div>
</template>

<script>
import {
  articleDetail,
  followUser,
  unFollowUser,
  likeArticle,
  disLikeArticle
} from "@/service/api/index"
import { timeAgo } from "@/utils/formatTime"
export default {
  data() {
    return {
      artObj: {},
      timeAgo
    }
  },
  async created() {
    const res = await articleDetail({
      article_id: this.$route.query.art_id
    })
    this.artObj = res.data.data
  },
  methods: {
    async folllow(flag) {
      if (flag) {
        this.artObj.is_followed = false
        await unFollowUser(this.artObj.aut_id)
      } else {
        this.artObj.is_followed = true
        await followUser(this.artObj.aut_id)
      }
    },
    async thumbsUp(flag) {
      if (flag) {
        this.artObj.attitude = "0"
        await disLikeArticle({ target: this.artObj.art_id })
      } else {
        this.artObj.attitude = "1"
        await likeArticle({ target: this.artObj.art_id })
      }
    }
  }
}
</script>

<style scoped>
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}
.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
}
/deep/.art-content img {
  width: 100%;
}
/deep/.art-content pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.van-cell {
  padding: 5px 0;
}
.van-cell::after {
  display: none;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}
.like-box {
  display: flex;
  justify-content: center;
}
</style>
