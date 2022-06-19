<template>
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        offset="50"
        @load="onLoad"
      >
        <articleItem
          v-for="(item, i) in list"
          :key="i"
          :obj="item"
          @dislikeFn="dislikeFn"
          @reportArt="reportArt"
          @click.native="itemClick(item.art_id)"
        ></articleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import articleItem from "../../../components/articleItem.vue"
import { getArticle, dislikeArticle, reportArticle } from "@/service/api/index"
import { Toast } from "vant"
export default {
  components: { articleItem },
  name: "articleList",
  props: {
    channelsId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: Date.now(),
      isLoading: false
    }
  },
  async created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      const res = await getArticle({
        channel_id: this.channelsId,
        timestamp: this.timestamp
      })
      this.list = [...this.list, ...res.data.data.results]
      this.timestamp = res.data.data.pre_timestamp
      this.loading = false
      if (res.data.data.pre_timestamp === null) {
        this.finished = true
      }
      this.isLoading = false
    },
    async onLoad() {
      if (this.list.length === 0) {
        this.loading = false
        return
      }
      this.getArticleList()
      this.loading = false
    },
    async onRefresh() {
      this.list = []
      this.timestamp = Date.now()
      this.getArticleList()
      this.isLoading = false
    },
    async dislikeFn(id) {
      await dislikeArticle(id)
      Toast.success("减少相关内容推荐")
    },
    async reportArt(target, type) {
      await reportArticle(target, type)
      Toast.success("反馈成功")
    },
    itemClick(id) {
      this.$router.push({
        path: `/articledetail?art_id=${id}`
      })
    }
  }
}
</script>

<style></style>
