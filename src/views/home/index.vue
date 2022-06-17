<template>
  <div class="home">
    <van-nav-bar fixed>
      <template #left>
        <img src="@/assets/img/logo.png" alt="" />
      </template>
      <template #right>
        <van-icon
          name="search"
          size="0.48rem"
          @click="$router.push('/search')"
        />
      </template>
    </van-nav-bar>
    <div class="tabs">
      <van-tabs
        v-model="channelsId"
        sticky
        offset-top="1.33333333333rem"
        @change="channelChangeFn"
      >
        <van-tab
          v-for="item in channels"
          :key="item.id"
          :title="item.name"
          :name="item.id"
          ><article-list :channelsId="channelsId"></article-list
        ></van-tab>
      </van-tabs>
      <van-icon
        name="plus"
        size="0.3833333334rem"
        class="more"
        @click="showPopup"
      ></van-icon>
    </div>
    <van-popup v-model="show" :style="{ height: '100%', width: '100%' }"
      ><channel-edit
        :userList="channels"
        :unCheckList="unCheckedChannel"
        ref="editRef"
        v-model="channelsId"
        @closePop="closePop"
        @addChannels="addChannels"
        @removeChan="removeChan"
      ></channel-edit
    ></van-popup>
  </div>
</template>

<script>
import {
  getUserChannel,
  getAllChannelsAPI,
  updateUserchannels,
  removeChannels
} from "@/service/api/index"
import articleList from "./cpn/articleList.vue"
import ChannelEdit from "./cpn/channelEdit.vue"
export default {
  components: { articleList, ChannelEdit },
  data() {
    return {
      channelsId: 0,
      channels: [],
      allChannelList: [],
      articleList: [],
      show: false
    }
  },
  async mounted() {
    const res = await getUserChannel()
    this.channels = res.data.data.channels

    const all = await getAllChannelsAPI()
    this.allChannelList = all.data.data.channels
  },
  methods: {
    async channelChangeFn() {},
    showPopup() {
      this.show = true
    },
    closePop() {
      this.show = false
      this.$refs.editRef.isEdit = false
    },
    async addChannels(channel) {
      this.channels.push(channel)

      const newArr = this.channels.filter((item) => item.id !== 0)
      const theNewArr = newArr.map((item, i) => {
        const newObj = { ...item }
        delete newObj.name
        newObj.seq = i
        return newObj
      })
      // newArr.forEach((item, i) => {
      //   delete item.name
      //   item.seq = i
      // })
      await updateUserchannels(theNewArr)
    },
    async removeChan(channel) {
      const index = this.channels.findIndex((item) => item.id === channel.id)
      this.channels.splice(index, 1)

      await removeChannels(channel.id)
    }
  },
  computed: {
    unCheckedChannel() {
      const newArr = this.allChannelList.filter((items) => {
        let index = this.channels.findIndex((item) => {
          return item.id === items.id
        })
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      return newArr
    }
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
.tabs {
  display: flex;
  align-items: center;
}
.tabs .more {
  z-index: 999;
  position: fixed;
  width: 20px;
  height: 30px;
  text-align: center;
  right: 0;
  top: 60px;
  background-color: #fff;
}
</style>
