import { nextTick } from "vue";

const autofocus = {
  async mounted(el: HTMLInputElement) {
    await nextTick()
    el.focus()
  }
}

export default autofocus
