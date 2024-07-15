import request from "@/api/request.ts";

export function getDbInfo(params?: any) {
  return request({
    url: '/sys-util/code-generation',
    method: 'GET',
    params
  })
}

export function genCode(id?: any) {
  return request({
    url: `/sys-util/code-generation/c/${id}`,
    method: 'GET'
  })
}

export function genCodeZip(id?: any) {
  return request({
    url: `/sys-util/code-generation/z/${id}`,
    method: 'GET'
  })
}
