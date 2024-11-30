import request from "@/api/request.ts";
import { SysDto } from "@/type/module/main/sysManage/sys.ts";

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

export function getSystems(): Promise<SysDto[]> {
  return request({
    url: '/sys/base/system',
    method: 'GET'
  })
}
