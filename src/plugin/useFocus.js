export function useFocus(Vue) {
  Vue.directive("focus", {
    inserted() {
      const ipt = document.querySelector("input")
      ipt.focus()
    }
  })
}
