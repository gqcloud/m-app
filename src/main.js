import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import useVant from "@/global/useVant"
import { useFocus } from "@/plugin/useFocus"
import "normalize.css"
import "amfe-flexible"

Vue.config.productionTip = false
useVant(Vue)
useFocus(Vue)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
