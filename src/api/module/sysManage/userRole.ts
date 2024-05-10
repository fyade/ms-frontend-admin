import request from "@/api/request.ts";
import { userRoleInsDto, userRoleSelDto, userRoleUpdDto } from "@/type/api/sysManage/userRole.ts";

export function userRoleSel(params: userRoleSelDto) {
  return request({
    url: '/sys-manage/user-role',
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

export function userRoleIns(params: userRoleInsDto) {
  return request({
    url: '/sys-manage/user-role',
    method: 'POST',
    data: params
  })
}

export function userRoleUpd(params: userRoleUpdDto) {
  return request({
    url: '/sys-manage/user-role',
    method: 'PUT',
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