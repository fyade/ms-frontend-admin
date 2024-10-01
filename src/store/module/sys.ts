import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { getSysVersion } from "@/api/sys.ts";
import { currentVersion } from "../../../config/config.ts";

export const useSysStore = defineStore('sysStore', () => {
  const version = reactive({
    hd: '',
    qd: currentVersion
  })
  getSysVersion().then(res => {
    version.hd = res
  })

  const currentSystem = ref<string>('')
  const setCurrentSystem = (sys: string) => {
    currentSystem.value = sys
  }
  const getCurrentSystem = computed(() => {
    return currentSystem.value
  })

  return {
    version,
    setCurrentSystem,
    getCurrentSystem
  }
})
