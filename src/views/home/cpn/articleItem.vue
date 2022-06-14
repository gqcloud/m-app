<template>
  <div class="article-item">
    <van-cell>
      <template #title>
        <div class="title-box">
          <span>{{ obj.title }}</span>
        </div>
      </template>
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ obj.comm_count }}评论</span>
            <span>{{ obj.pubdate }}</span>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "articleItem",
  props: {
    obj: {
      type: Object,
      default: () => {}
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
</style>
