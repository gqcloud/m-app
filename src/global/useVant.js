import {
  Button,
  NavBar,
  Form,
  Field,
  Tabbar,
  TabbarItem,
  Icon,
  Tab,
  Tabs,
  Cell
} from "vant"
const arr = [
  Button,
  NavBar,
  Form,
  Field,
  Tabbar,
  TabbarItem,
  Icon,
  Tabs,
  Tab,
  Cell
]
export default function (Vue) {
  return arr.forEach((item) => Vue.use(item))
}
