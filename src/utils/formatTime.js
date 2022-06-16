import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/zh"
/**
 *
 * @param {*} 多久之前的时间
 * @returns 系统时间到指定时间的距离值
 */
export const timeAgo = (targetTime) => {
  dayjs.extend(relativeTime)
  dayjs.locale("zh")
  var a = dayjs()
  var b = dayjs(targetTime)
  return a.to(b)
}

export const formatDate = (dataObj) => {
  return dayjs(dataObj).format("YYYY-MM-DD")
}
