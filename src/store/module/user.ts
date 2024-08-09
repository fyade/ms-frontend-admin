import { defineStore } from "pinia";
import router from "@/router/index.ts";
import { reactive, ref } from "vue";
import { ElNotification, NotificationHandle } from "element-plus";
import { RouteRecordNormalized, useRoute } from "vue-router";
import { loginDto, userDto } from "@/type/api/sysManage/user.ts";
import { loginApi } from "@/api/module/sysManage/user.ts";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import { clearObject, copyObject, deepClone } from "@/utils/ObjectUtils.ts";
import { ifWebsiteLink } from "@/utils/LinkUtils.ts";
import { final } from "@/utils/base.ts";
import { menuDto } from "@/type/api/sysManage/menu.ts";

const modules = import.meta.glob("../../views/**/**/**.vue")

export const useUserStore = defineStore('userStore', () => {
  const token = ref('')
  const userinfo: userDto = reactive({
    id: '',
    username: '',
    nickname: '',
    password: '',
    avatar: '',
    sex: '',
    email: '',
    tel: '',
  })
  const ifLogin = ref(false)
  const route = useRoute()
  const login = async (user: loginDto) => {
    return new Promise((resolve, reject) => {
      loginApi(user).then(async res => {
        if (res) {
          let notification: NotificationHandle = ElNotification({
            title: '提示',
            message: '登录成功，系统资源加载中。。。',
            type: 'success',
            showClose: false,
            duration: 0,
          });
          try {
            const permissions = (await Promise.all((deepClone<menuDto[]>(res.permissions).filter(item => {
              return ['mm', 'mc'].indexOf(item.type) > -1 && item.ifVisible === final.Y
            }) as unknown as (RouteRecordNormalized & menuDto & { component: any })[]).map(async item => {
              item.meta = {
                ...item,
                asideMenu: true
              }
              item.name = item.perms
              if (item.type === 'mc') {
                const component = await modules[`${item.component.indexOf('@') === 0 ? item.component.replace('@', '../..') : item.component}`]()
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
            copyObject(userinfo, res.user)
            if (route.query?.redirect && route.query?.redirect !== '/404' && !ifWebsiteLink(route.query?.redirect.toString(), '/')) {
              notification.close()
              await router.push(route.query.redirect as string)
            } else {
              notification.close()
              await router.push('/')
            }
          } catch (e) {
            ElMessage.error({
              message: '系统发生故障，请检查菜单是否有错误，若无法解决，请查看开发文档或联系开发者。',
              duration: 0,
              showClose: true
            })
            notification.close()
            reject()
          }
        }
        resolve(null)
      }).catch((e) => {
        console.error(e)
        reject()
      })
    })
  }
  const removeToken = () => {
    token.value = ''
    ifLogin.value = false
    clearObject(userinfo)
  }
  return {
    token,
    userinfo,
    ifLogin,
    login,
    removeToken
  }
})