export function useFocus(Vue) {
  Vue.directive("focus", {
    inserted(el) {
      if (el.nodeName === "TEXTAREA" || el.nodeName === "INPUT") {
        el.focus()
      } else {
        const ipt = document.querySelector("input")
        const txt = document.querySelector("textarea")
        if (ipt) ipt.focus()
        if (txt) txt.focus()
      }
    }
  })
}
