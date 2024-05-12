import request from "@/api/request.ts";

export function getDbInfo(params: any) {
  return request({
    url: '/sys-util/code-generation',
    method: 'GET',
    params
  })
}