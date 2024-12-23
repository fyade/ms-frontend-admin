import request from "@/api/request.ts";
import { SysDto } from "@/type/module/main/sysManage/sys.ts";
import { MenuDto } from "@/type/module/main/sysManage/menu.ts";

export function getSysVersion() {
  return request({
    url: '/sys/base/v',
    method: 'GET'
  })
}

export function getSysInfo() {
  return request({
    url: '/sys/base/system-base-info',
    method: 'GET'
  })
}

export function getSystems() {
  return request<SysDto[]>({
    url: '/sys/base/system',
    method: 'GET'
  })
}

export function getPages(sysId: number) {
  return request<MenuDto[]>({
    url: `/sys/base/page/${sysId}`,
    method: 'GET'
  })
}

export function getButtons(sysId: number) {
  return request<MenuDto[]>({
    url: `/sys/base/button/${sysId}`,
    method: 'GET'
  })
}
