<template>
  <div>
    <div class="search-header">
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      ></van-icon>
      <van-search
        placeholder="请输入搜索关键词"
        background="#007bff"
        shape="round"
        v-focus
        v-model="kw"
        @input="inputFn"
        @search="goResultIpt"
      ></van-search>
    </div>

    <div class="searchList" v-if="kw.length !== 0">
      <div
        class="searchItem"
        v-for="(item, i) in searchList"
        :key="i"
        v-html="highLightFn(item, kw)"
        @click="goResultList(item)"
      ></div>
    </div>

    <div class="searchHistory" v-else>
      <van-cell title="搜索历史">
        <template #right-icon>
          <van-icon
            name="delete"
            class="searchIcon"
            @click="deleteHis"
          ></van-icon>
        </template>
      </van-cell>
      <div class="historyList">
        <span
          class="historyItem"
          v-for="(item, index) in history"
          :key="index"
          @click="goResultHis(item)"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { searchList } from "@/service/api/index"
import LocalCache from "@/utils/cache"
export default {
  data() {
    return {
      kw: "",
      timer: null,
      searchList: [],
      history: LocalCache.getCache("his") || []
    }
  },
  methods: {
    inputFn() {
      clearTimeout(this.timer)
      if (this.kw.length === 0) {
        this.searchList = []
      }
      this.timer = setTimeout(async () => {
        if (this.kw.length === 0) return
        const res = await searchList(this.kw)
        this.searchList = res.data.data.options
      }, 500)
    },
    highLightFn(originStr, target) {
      let reg = new RegExp(target, "ig")
      return originStr.replace(reg, (match) => {
        return `<span style="color:red;">${match}</span>`
      })
    },
    goToDetail(kw) {
      setTimeout(() => {
        this.$router.push({
          path: `/searchresult/${kw}`
        })
      })
    },
    goResultIpt() {
      if (this.kw.length > 0) {
        this.history.push(this.kw)
        this.goToDetail(this.kw)
      }
    },
    goResultList(item) {
      this.history.push(this.kw)
      this.goToDetail(item)
    },
    goResultHis(item) {
      this.$router.push({
        path: `/searchresult/${item}`
      })
    },
    deleteHis() {
      this.history = []
    }
  },
  watch: {
    history: {
      handler() {
        const newHistory = new Set(this.history)
        const arr = Array.from(newHistory)
        LocalCache.setCache("his", arr)
      },
      deep: true
    }
  }
}
</script>

<style>
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
}
.search-header .goback {
  padding-left: 14px;
}
.search-header .van-search {
  flex: 1;
}
.searchList .searchItem {
  padding: 0 15px;
  border-bottom: 1px solid #f8f8f8;
  font-size: 14px;
  line-height: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.searchIcon {
  font-size: 16px;
  line-height: inherit;
}
.historyList {
  padding: 0 10px;
}
.historyList .historyItem {
  display: inline-block;
  font-size: 12px;
  padding: 8px 14px;
  background-color: #efefef;
  margin: 10px 8px 0px 8px;
  border-radius: 10px;
}
.van-cell__title {
  border: 0;
}
</style>
