import Vue from "vue"
import VueRouter from "vue-router"
import Login from "@/views/login"
import Layout from "@/views/layout"
import Home from "@/views/home"
import User from "@/views/user"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/layout/home"
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/layout",
    name: "layout",
    component: Layout,
    children: [
      {
        path: "home",
        name: "home",
        component: Home
      },
      {
        path: "user",
        name: "user",
        component: User
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
