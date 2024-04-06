import { useUserStore } from "./module/user.ts";
import { useRouterStore } from "@/store/module/router.ts";

export default function useStore() {
  return {
    router: useRouterStore(),
    user: useUserStore()
  }
}