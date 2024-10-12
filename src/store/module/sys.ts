import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { getSysVersion } from "@/api/sys.ts";
import { currentVersion } from "../../../config/config.ts";
import { SysDto } from "@/type/module/main/sysManage/sys.ts";
import { copyObject } from "@/utils/ObjectUtils.ts";

export const useSysStore = defineStore('sysStore', () => {
  const version = reactive({
    hd: '',
    qd: currentVersion
  })
  getSysVersion().then(res => {
    version.hd = res
  })

  const currentSystem = reactive<SysDto>(new SysDto())
  const setCurrentSystem = (dto: SysDto) => {
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
