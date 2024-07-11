import request from "@/api/request.ts";
import {
  userRoleUpdURDto,
  userRoleUpdRUDto,
  userRoleSelAllDto,
  userRoleSelDto
} from "@/type/api/sysManage/userRole.ts";

export function userRoleSel(params: userRoleSelDto) {
  return request({
    url: '/sys-manage/user-role',
    method: 'GET',
    params: params
  })
}

export function userRoleSelAll(params: userRoleSelAllDto) {
  return request({
    url: '/sys-manage/user-role/all',
    method: 'GET',
    params: params
  })
}

export function userRoleSelById(id: any) {
  return request({
    url: `/sys-manage/user-role/${id}`,
    method: 'GET'
  })
}

export function userRoleUpdUR(params: userRoleUpdURDto) {
  return request({
    url: '/sys-manage/user-role/ur',
    method: 'POST',
    data: params
  })
}

export function userRoleUpdRU(params: userRoleUpdRUDto) {
  return request({
    url: '/sys-manage/user-role/ru',
    method: 'POST',
    data: params
  })
}

export function userRoleDel(ids: any[]) {
  return request({
    url: '/sys-manage/user-role',
    method: 'DELETE',
    data: ids
  })
}
