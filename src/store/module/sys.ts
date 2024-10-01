import { defineStore } from "pinia";
import { reactive } from "vue";
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
  return {
    version
  }
})
