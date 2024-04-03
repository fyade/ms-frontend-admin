import { defineStore } from "pinia";
import router from "@/router/index.ts";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { loginDto } from "@/type/api/sys/user.ts";
import { loginApi } from "@/api/module/sys/user.ts";

export const useUserStore = defineStore('userStore', () => {
  const token = ref('')
  const userinfo: any = reactive({})
  const ifLogin = ref(false)
  const route = useRoute()
  const login = (user: loginDto) => {
    loginApi(user).then(({res}) => {
      if (res.code === 200) {
        token.value = res.data.token
        ifLogin.value = true
        Object.keys(res.data.user).forEach(key => {
          userinfo[key] = res.data.user[key]
        })
        ElMessage.success('登录成功。')
        if (route.query?.redirect) {
          router.push(route.query.redirect as string)
        } else {
          router.push('/')
        }
      } else {
        ElMessage.warning(res.msg)
      }
    })
  }
  const removeToken = () => {
    token.value = ''
    ifLogin.value = false
    Object.keys(userinfo).forEach(key => {
      userinfo[key] = ''
    })
  }
  return {
    token,
    userinfo,
    ifLogin,
    login,
    removeToken
  }
})