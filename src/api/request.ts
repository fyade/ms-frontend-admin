import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStore } from "@/store/module/user.ts";
import { ElMessage } from "element-plus";
import { useSysStore } from "@/store/module/sys.ts";
import { currentEnv } from "~/config/config.ts";
import { AxiosRes } from "@/type/asiox.ts";

const env = currentEnv();
export const baseURL = env.VITE_API_PREFIX
export const fileBaseUrl = env.VITE_API_FILE_PREFIX + '/'

const request = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 60 * 10
})
request.interceptors.request.use(
  config => {
    const publicHeader = useSysStore().publicHeader();
    Object.keys(publicHeader).forEach(key => {
      config.headers[key] = publicHeader[key]
    })
    return config
  }
)
request.interceptors.response.use(
  async response => {
    if (response.data.code && response.data.code !== 200) {
      ElMessage.error(response.data.msg)
      return Promise.reject(response)
    }
    return Promise.resolve(response)
  },
  async error => {
    if (error.response.data.code === 401) {
      useUserStore().removeToken()
      ElMessage.error('登录已过期，请重新登录。')
      window.location.href = `/login?redirect=${window.location.pathname}`
    } else {
      let msg = error.response.data.msg
      if (error.response.data.code === 403) msg = msg
      else if (error.response.data.code === 500) msg = '系统繁忙，请稍后再试。'
      else if (!msg) msg = '系统繁忙，请稍后再试。'
      ElMessage.error(msg)
    }
    return Promise.reject(error.response)
  }
)

/**
 * 请求
 * @param param
 */
export default function <T = any>(param: AxiosRequestConfig): Promise<T> {
  return request2(param)
}

/**
 * 请求 2.0
 * @param param
 * @param options
 */
export async function request2<T = any>(param: AxiosRequestConfig, options: { level: 0 }): Promise<AxiosResponse<AxiosRes<T>>>;
export async function request2<T = any>(param: AxiosRequestConfig, options: { level: 1 }): Promise<AxiosRes<T>>;
export async function request2<T = any>(param: AxiosRequestConfig, options: { level: 2 }): Promise<T>;
export async function request2<T = any>(param: AxiosRequestConfig, options?: { level?: 0 | 1 | 2 }): Promise<T>;
export async function request2<T = any>(param: AxiosRequestConfig, {
                                          level = 2,
                                          errLevel = 2
                                        }: {
                                          level?: 0 | 1 | 2
                                          errLevel?: 0 | 1 | 2
                                        } = {}
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await request(param);
      if (level === 0) {
        resolve(response as any)
      } else if (level === 1) {
        resolve(response.data as any)
      } else if (level === 2) {
        resolve(response.data.data as any)
      }
    } catch (err: any) {
      if (errLevel === 0) {
        reject(err)
      } else if (errLevel === 1) {
        reject(err?.data)
      } else if (errLevel === 2) {
        reject(err?.data?.msg)
      }
    }
  })
}
