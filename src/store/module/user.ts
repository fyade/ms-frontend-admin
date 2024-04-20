import { defineStore } from "pinia";
import router from "@/router/index.ts";
import { defineAsyncComponent, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { loginDto } from "@/type/api/sys/user.ts";
import { loginApi } from "@/api/module/sys/user.ts";
import { arr2ToDiguiObj, deepClone } from "@/utils/baseUtils.ts";

const modules = import.meta.glob("../../views/**/**/**.vue")

export const useUserStore = defineStore('userStore', () => {
  const token = ref('')
  const userinfo: any = reactive({})
  const ifLogin = ref(false)
  const route = useRoute()
  const login = async (user: loginDto) => {
    loginApi(user).then(async ({res}) => {
      if (res.code === 200) {
        const permissions = await Promise.all(deepClone<any[]>(res.data.permissions).filter(item => ['mm', 'mc'].indexOf(item.type) > -1).map(async item => {
          item.meta = {
            asideMenu: true,
            label: item.label
          }
          item.name = item.path
          if (item.type === 'mc') {
            const component: any = await modules[`${item.component.indexOf('@') === 0 ? item.component.replace('@', '../..') : item.component}`]()
            item.component = component.default
          } else {
            delete item.component
          }
          return item
        }))
        const permissionsObj = arr2ToDiguiObj(permissions, {ifDeepClone: false});
        router.addRoute('/', permissionsObj[0])
        token.value = res.data.token
        ifLogin.value = true
        Object.keys(res.data.user).forEach(key => {
          userinfo[key] = res.data.user[key]
        })
        ElMessage.success('登录成功。')
        if (route.query?.redirect) {
          await router.push(route.query.redirect as string)
        } else {
          await router.push('/')
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