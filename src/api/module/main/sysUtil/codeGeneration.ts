import request from "@/api/request.ts";

export function getDbInfo() {
  return request({
    url: '/main/sys-util/code-generation',
    method: 'GET',
  })
}

export function genCode(id?: number) {
  return request({
    url: `/main/sys-util/code-generation/c/${id}`,
    method: 'GET'
  })
}

export function genCodeZip(id?: number) {
  return request({
    url: `/main/sys-util/code-generation/z/${id}`,
    method: 'GET'
  })
}
