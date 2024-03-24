import { useUserStore } from "./module/user.ts";
import { usePageStore } from "@/store/module/page.ts";

export default function useStore() {
  return {
    user: useUserStore(),
    page: usePageStore()
  }
}