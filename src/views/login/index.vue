<template>
  <div class="login">
    <van-nav-bar title="新闻头条-登录"></van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        label="手机号"
        placeholder="手机号"
        :rules="[
          {
            required: true,
            message: '请填写正确手机号',
            pattern: /^1[3-9]\d{9}$/
          }
        ]"
      />
      <van-field
        v-model="user.code"
        type="password"
        name="code"
        label="验证码"
        placeholder="验证码"
        :rules="[
          { required: true, message: '请填写6位验证码', pattern: /^\d{6}$/ }
        ]"
      />
      <div style="margin: 16px">
        <van-button
          :loading="isLoading"
          :disabled="isLoading"
          loading-text="正在登录..."
          round
          block
          type="info"
          native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from "@/service/api/index"
import { Toast } from "vant"
import LocalCache from "@/utils/cache"
export default {
  name: "login",
  data() {
    return {
      user: {
        mobile: "",
        code: "246810"
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit() {
      this.isLoading = true
      try {
        const res = await loginAPI(this.user.mobile, this.user.code)
        Toast.fail("登录成功")
        LocalCache.setCache("token", res.data.data.token)
        this.$router.replace("/layout/home")
      } catch (error) {
        Toast.fail("登录失败，请重试")
      }
      this.isLoading = false
    }
  }
}
</script>

<style></style>
