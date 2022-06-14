import { Button, NavBar, Form, Field } from "vant"
const arr = [Button, NavBar, Form, Field]
export default function (Vue) {
  return arr.forEach((item) => Vue.use(item))
}
