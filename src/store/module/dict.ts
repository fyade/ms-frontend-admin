import { defineStore } from "pinia";
import { DicDataDto } from "@/type/module/main/sysManage/dicData.ts";
import { computed, ref } from "vue";
import { dicDataOfPerm } from "@/api/module/main/sysManage/dicData.ts";

export const useDictStore = defineStore('dictStore', () => {
  const dicts = ref(new Map<string, DicDataDto[]>())
  const getDict = (perm: string) => computed(() => {
    if (!dicts.value.has(perm)) {
      dicts.value.set(perm, [])
      dicDataOfPerm(perm).then(data => {
        dicts.value.set(perm, data)
      })
    }
    return dicts.value.get(perm)
  })
  return {
    getDict
  }
})
