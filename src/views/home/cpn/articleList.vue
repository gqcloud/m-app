<template>
  <div class="article-list">
    <articleItem
      v-for="item in list"
      :key="item.art_id"
      :obj="item"
    ></articleItem>
  </div>
</template>

<script>
import articleItem from "./articleItem.vue"
export default {
  components: { articleItem },
  name: "articleList",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style></style>
