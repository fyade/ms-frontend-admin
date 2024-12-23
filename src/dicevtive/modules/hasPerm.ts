import { directiveBinding } from "@/dicevtive";
import { typeOf } from "@/utils/ObjectUtils.ts";
import { useSysStore } from "@/store/module/sys.ts";

const hasPerm = {
  mounted: (el: HTMLElement, binging: directiveBinding<string[] | string>) => {
    const sysStore = useSysStore();
    let ifHasPerm = false
    if (typeOf(binging.value) === 'array') {
      ifHasPerm = (binging.value as string[]).some(str => sysStore.getVisibleButton(sysStore.getCurrentSystem.perms, str))
    }
    if (typeOf(binging.value) === 'string') {
      ifHasPerm = sysStore.getVisibleButton(sysStore.getCurrentSystem.perms, binging.value as string)
    }
    if (!ifHasPerm) {
      el.remove()
    }
  }
}

export default hasPerm
