<template>
  <div class="home">
    <van-nav-bar fixed>
      <template #left>
        <img src="@/assets/img/logo.png" alt="" />
      </template>
      <template #right>
        <van-icon name="search" size="0.48rem" />
      </template>
    </van-nav-bar>
    <div class="tabs">
      <van-tabs v-model="active" sticky offset-top="1.33333333333rem">
        <van-tab v-for="item in channels" :key="item.id" :title="item.name"
          ><article-list :list="articleList"></article-list
        ></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getUserChannel, getArticle } from "@/service/api/index"
import articleList from "./cpn/articleList.vue"
export default {
  components: { articleList },
  data() {
    return {
      active: 0,
      channels: [],
      articleList: []
    }
  },
  async mounted() {
    const res = await getUserChannel()
    this.channels = res.data.data.channels

    const res2 = await getArticle({ channel_id: 1, timestamp: Date.now() })
    this.articleList = res2.data.data.results
    console.log(res2)
  }
}
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
}
.van-nav-bar .van-icon {
  color: white;
}
/deep/.van-sticky--fixed {
  top: 46px !important;
}
/deep/.van-tabs__line {
  background-color: #1989fa !important;
}
</style>
