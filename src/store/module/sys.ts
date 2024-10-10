import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { getSysVersion } from "@/api/sys.ts";
import { currentVersion } from "../../../config/config.ts";
import { sysDto } from "@/type/module/main/sysManage/sys.ts";
import { copyObject } from "@/utils/ObjectUtils.ts";

export const useSysStore = defineStore('sysStore', () => {
  const version = reactive({
    hd: '',
    qd: currentVersion
  })
  getSysVersion().then(res => {
    version.hd = res
  })

  const currentSystem = reactive<sysDto>(new sysDto())
  const setCurrentSystem = (dto: sysDto) => {
    copyObject(currentSystem,dto)
  }
  const getCurrentSystem = computed(() => {
    return currentSystem
  })

  return {
    version,
    setCurrentSystem,
    getCurrentSystem
  }
})
