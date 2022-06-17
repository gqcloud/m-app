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
  Cell,
  List,
  PullRefresh,
  ActionSheet,
  Popup,
  Row,
  Col,
  Badge,
  Search,
  Image as VanImage
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
  Cell,
  List,
  PullRefresh,
  ActionSheet,
  Popup,
  Row,
  Col,
  Badge,
  Search,
  VanImage
]
export default function (Vue) {
  return arr.forEach((item) => Vue.use(item))
}
