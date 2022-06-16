<template>
  <div class="article-item">
    <van-cell>
      <template #title>
        <div class="title-box">
          <span>{{ obj.title }}</span>
          <img
            v-if="obj.cover.type === 1"
            class="thumb"
            :src="obj.cover.images[0]"
            alt=""
          />
        </div>
        <div class="thmb-box" v-if="obj.cover.type > 1">
          <img
            v-for="(item, i) in obj.cover.images"
            :key="i"
            class="thumb"
            :src="item"
            alt=""
          />
        </div>
      </template>
      <template #label>
        <div class="label-box">
          <div>
            <span>vue2</span>
            <span>{{ obj.comm_count }}评论</span>
            <span>{{ timeAgo(obj.pubdate) }}</span>
          </div>
        </div>
        <van-icon name="cross" @click="show = true"></van-icon>
      </template>
    </van-cell>

    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      @cancel="cancelFn"
      @close="closeFn"
      get-container="body"
      :cancel-text="botText"
    />
  </div>
</template>

<script>
import { timeAgo } from "@/utils/formatTime"
import { firstActions, secondActions } from "@/service/api/report"

export default {
  name: "articleItem",
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      timeAgo,
      show: false,
      actions: firstActions,
      botText: "取消"
    }
  },
  methods: {
    onSelect(action) {
      if (action.name === "反馈垃圾内容") {
        this.actions = secondActions
        this.botText = "返回"
      } else if (action.name === "不感兴趣") {
        this.$emit("dislikeFn", this.obj.art_id)
        this.show = false
      } else {
        this.$emit("reportArt", this.obj.art_id, action.value)
        this.actions = firstActions
        this.show = false
      }
    },
    cancelFn() {
      if (this.botText === "返回") {
        this.show = true
        this.actions = firstActions
        this.botText = "取消"
      }
    },
    closeFn() {
      this.actions = firstActions
      this.botText = "取消"
    }
  }
}
</script>

<style>
.label-box {
  display: flex;
  justify-content: space-between;
}
.label-box span {
  margin: 0 6px;
  margin-left: 0;
}
.van-cell__title {
  border-bottom: 1px solid #eee;
  padding-bottom: 6px;
}
.title-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}
.thumb-box {
  display: flex;
  justify-content: space-between;
}
.van-cell__label {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
