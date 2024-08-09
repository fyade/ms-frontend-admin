/**
 * v-focus 页面挂载后自动聚焦
 */
const focus = {
  mounted: (el: HTMLElement) => {
    el.querySelector('input')?.focus()
  }
}

export default focus
