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
  </div>
</template>

<script>
export default {}
</script>

<style>
.search_wrap {
  padding-top: 46px;
}
</style>
