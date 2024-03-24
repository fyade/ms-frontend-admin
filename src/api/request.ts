import axios from "axios";
import { useUserStore } from "@/store/module/user.ts";
import { ElMessage } from "element-plus";
import { axiosVo } from "@/type/asiox.ts";

export const baseURL = import.meta.env.VITE_API_PREFIX
export const fileBaseUrl = import.meta.env.VITE_API_FILE_PREFIX + '/'
const request = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 60 * 10
})
request.interceptors.request.use(
    config => {
      config.headers['Authorization'] = useUserStore().token
      return config
    }
)
request.interceptors.response.use(
    response => {
      if (response.data.code && response.data.code !== 200) {
        ElMessage.error(response.data.msg)
        return Promise.reject(response.data.msg)
      }
      return Promise.resolve({
        res: response.data,
        ...response
      } as axiosVo)
    },
    error => {
      if (error.response.status === 401) {
        useUserStore().removeToken()
        ElMessage.error('登陆已过期，请重新登录。')
        window.location.href = '/login'
      } else if (error.response.status === 403) {
        ElMessage.error('无权限。')
      } else {
        ElMessage.error('系统繁忙，请稍后再试。')
      }
      return Promise.reject(error)
    }
)

export default function (param: any): Promise<axiosVo> {
  return request(param)
}
