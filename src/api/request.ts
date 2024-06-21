import axios from "axios";
import { useUserStore } from "@/store/module/user.ts";
import { ElMessage } from "element-plus";
import { axiosVo } from "@/type/asiox.ts";
import { sleep } from "@/utils/baseUtils.ts";

export const baseURL = import.meta.env.VITE_API_PREFIX
export const fileBaseUrl = import.meta.env.VITE_API_FILE_PREFIX + '/'
const maxReqCount = 3
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
let count0 = 0
request.interceptors.response.use(
    async response => {
      if (response.data.code && response.data.code !== 200) {
        await sleep(100)
        for (let i = 0; i < maxReqCount - 1 && count0 < maxReqCount - 1; i++) {
          count0++
          const response1 = await request({
            url: response.config.url,
            method: response.config.method,
            data: JSON.parse(response.config.data)
          });
          count0 = 0
          return Promise.resolve(response1 as any)
        }
        ElMessage.error(response.data.msg)
        count0 = 0
        return Promise.reject(response.data.msg)
      }
      count0 = 0
      return Promise.resolve(response.data.data as any)
    },
    error => {
      count0 = 0
      if (error.response.status === 401) {
        useUserStore().removeToken()
        ElMessage.error('登录已过期，请重新登录。')
        window.location.href = '/login'
      } else if (error.response.status === 403) {
        ElMessage.error('无权限。')
      } else {
        ElMessage.error(error.response.data.message || '系统繁忙，请稍后再试。')
      }
      return Promise.reject(error)
    }
)

// const request2 = axios.create({
//   baseURL: baseURL,
//   timeout: 1000 * 60 * 10
// })
// request2.interceptors.request.use(
//     config => {
//       config.headers['Authorization'] = useUserStore().token
//       return config
//     }
// )
// request2.interceptors.response.use(
//     response => {
//       if (response.data.code && response.data.code !== 200) {
//         ElMessage.error(response.data.msg)
//         return Promise.reject(response.data.msg)
//       }
//       return Promise.resolve({
//         res: response.data,
//         ...response
//       } as axiosVo)
//     },
//     error => {
//       if (error.response.status === 401) {
//         useUserStore().removeToken()
//         ElMessage.error('登录已过期，请重新登录。')
//         window.location.href = '/login'
//       } else if (error.response.status === 403) {
//         ElMessage.error('无权限。')
//       } else {
//         ElMessage.error(error.response.data.message || '系统繁忙，请稍后再试。')
//       }
//       return Promise.reject(error)
//     }
// )

export default function (param: any): Promise<any> {
  return request(param)
}

// export function reques_(param: any): Promise<axiosVo> {
//   return request2(param)
// }
