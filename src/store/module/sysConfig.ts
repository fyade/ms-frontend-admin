import { defineStore } from "pinia";
import { ref } from "vue";

export const useSysConfigStore = defineStore('sysConfigStore', () => {
  const menuCollapse = ref(false)
  const getMenuCollapse = () => {
    return menuCollapse.value
  }
  const setMenuCollapse = (b: boolean) => {
    menuCollapse.value = b
  }
  return {
    getMenuCollapse,
    setMenuCollapse,
  }
})
