import { useUserStore } from "./module/user.ts";
import { usePageStore } from "@/store/module/page.ts";
import { useRouterStore } from "@/store/module/router.ts";

export default function useStore() {
  return {
    page: usePageStore(),
    router: useRouterStore(),
    user: useUserStore()
  }
}