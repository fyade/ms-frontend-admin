import request from "@/api/request.ts";

export function getSysVersion() {
  return request({
    url: '/sys/base/v',
    method: 'GET'
  })
}
