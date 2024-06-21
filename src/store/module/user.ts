import { defineStore } from "pinia";
import router from "@/router/index.ts";
import { defineAsyncComponent, reactive, ref } from "vue";
import { ElMessage, ElNotification } from "element-plus";
import { RouteRecordNormalized, useRoute } from "vue-router";
import { loginDto } from "@/type/api/sysManage/user.ts";
import { loginApi } from "@/api/module/sysManage/user.ts";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import { deepClone, ifValid } from "@/utils/ObjectUtils.ts";
import { ifWebsiteLink } from "@/utils/LinkUtils.ts";

const modules = import.meta.glob("../../views/**/**/**.vue")

export const useUserStore = defineStore('userStore', () => {
  const token = ref('')
  const userinfo: any = reactive({})
  const ifLogin = ref(false)
  const route = useRoute()
  const login = async (user: loginDto) => {
    return new Promise((resolve, reject) => {
      loginApi(user).then(async res => {
        if (res) {
          const notification = ElNotification({
            title: '提示',
            message: '登录成功，系统资源加载中。。。',
            type: 'success',
            showClose: false,
            duration: 0,
          });
          const permissions = (await Promise.all(deepClone<any[]>(res.permissions).filter(item => ['mm', 'mc'].indexOf(item.type) > -1).map(async item => {
            item.meta = {
              ...item,
              asideMenu: true
            }
            item.name = item.perms
            if (item.type === 'mc') {
              const component: any = await modules[`${item.component.indexOf('@') === 0 ? item.component.replace('@', '../..') : item.component}`]()
              item.component = component.default
            } else {
              delete item.component
            }
            return item
          })))
          const permissionsObj = arr2ToDiguiObj(permissions, {ifDeepClone: false});
          for (let i = 0; i < permissionsObj.length; i++) {
            router.addRoute('/', permissionsObj[i])
          }
          token.value = res.token
          ifLogin.value = true
          Object.keys(res.user).forEach(key => {
            userinfo[key] = res.user[key]
          })
          if (route.query?.redirect && route.query?.redirect !== '/404' && !ifWebsiteLink(route.query?.redirect.toString(), '/')) {
            notification.close()
            await router.push(route.query.redirect as string)
          } else {
            notification.close()
            await router.push('/')
          }
        }
        resolve(null)
      }).catch((e) => {
        reject()
      })
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