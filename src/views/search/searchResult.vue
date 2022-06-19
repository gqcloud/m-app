<template>
  <div class="search-result">
    <div class="search_wrap">
      <van-nav-bar
        title="频道文章"
        left-text="返回"
        left-arrow
        fixed
        @click-left="$router.go(-1)"
      />
    </div>
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <article-item
          v-for="(item, i) in resultList"
          :key="i"
          :obj="item"
          :isShow="false"
          @click.native="itemClick(item.art_id)"
        ></article-item>
      </van-list>
    </div>
  </div>
</template>

<script>
import { searchResult } from "@/service/api/index"
import articleItem from "@/components/articleItem.vue"
export default {
  components: { articleItem },
  props: ["kw"],
  data() {
    return {
      page: 1,
      resultList: [],
      loading: false,
      finished: false
    }
  },
  async created() {
    const res = await searchResult({
      page: this.page,
      q: this.kw
    })
    this.resultList = res.data.data.results
  },
  methods: {
    async onLoad() {
      if (this.resultList.length > 0) {
        this.page++
        let res = await searchResult({
          page: this.page,
          q: this.kw
        })
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.resultList = [...this.resultList, ...res.data.data.results]
        this.loading = false
      }
    },
    itemClick(id) {
      this.$router.push({
        path: `/articledetail?art_id=${id}`
      })
    }
  }
}
</script>

<style>
.search_wrap {
  padding-top: 46px;
}
</style>
