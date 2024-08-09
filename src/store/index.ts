import { useUserStore } from "./module/user.ts";
import { useRouterStore } from "@/store/module/router.ts";
import { useSysStore } from "@/store/module/sys.ts";

export default function useStore() {
  return {
    router: useRouterStore(),
    sys: useSysStore(),
    user: useUserStore(),
  }
}