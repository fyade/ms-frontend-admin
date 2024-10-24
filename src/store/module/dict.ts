import { defineStore } from "pinia";
import { DicDataDto } from "@/type/module/main/sysManage/dicData.ts";
import { computed, ref } from "vue";
import { dicDataOfPerm } from "@/api/module/main/sysManage/dicData.ts";

export const useDictStore = defineStore('dictStore', () => {
  const dicts = ref(new Map<string, DicDataDto[]>())
  const getDict_ = async (perm: string) => {
    if (!dicts.value.has(perm)) {
      const data = await dicDataOfPerm(perm);
      dicts.value.set(perm, data)
    }
    return dicts.value.get(perm)
  }
  const getDict = (perm: string) => computed(() => getDict_(perm))
  return {
    getDict
  }
})
