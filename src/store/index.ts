import { useUserStore } from "./module/user.ts";
import { useRouterStore } from "@/store/module/router.ts";
import { useSysStore } from "@/store/module/sys.ts";
import { useSysConfigStore } from "@/store/module/sysConfig.ts";
import { useDictStore } from "@/store/module/dict.ts";

export default function useStore() {
  return {
    dict: useDictStore(),
    router: useRouterStore(),
    sys: useSysStore(),
    sysConfig: useSysConfigStore(),
    user: useUserStore(),
  }
}
