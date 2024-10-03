import request from "@/api/request.ts";
import { sysDto } from "@/type/api/main/sysManage/sys.ts";

export function getSysVersion() {
  return request({
    url: '/sys/base/v',
    method: 'GET'
  })
}

export function getSysInfo() {
  return request({
    url: '/sys/base/info',
    method: 'GET'
  })
}

export function getPermissions(sysId: number) {
  return request({
    url: `/sys/base/permission/${sysId}`,
    method: 'GET'
  })
}

export function getSystems(): Promise<sysDto[]> {
  return request({
    url: '/sys/base/system',
    method: 'GET'
  })
}
