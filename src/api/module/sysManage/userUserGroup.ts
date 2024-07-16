import request from "@/api/request.ts";
import {
  userUserGroupSelAllDto,
  userUserGroupSelDto,
  userUserGroupUpdUGUDtp,
  userUserGroupUpdUUGDtp
} from "@/type/api/sysManage/userUserGroup.ts";

export function userUserGroupSel(params: userUserGroupSelDto) {
  return request({
    url: '/sys-manage/user-user-group',
    method: 'GET',
    params: params
  })
}

export function userUserGroupSelAll(params: userUserGroupSelAllDto) {
  return request({
    url: '/sys-manage/user-user-group/all',
    method: 'GET',
    params: params
  })
}

export function userUserGroupSelById(id: number) {
  return request({
    url: `/sys-manage/user-user-group/${id}`,
    method: 'GET'
  })
}

export function userUserGroupSelByIds(ids: any[]) {
  return request({
    url: `/sys-manage/user-user-group/ids`,
    method: 'GET',
    params: ids
  })
}

export function userUserGroupUpdUUG(param: userUserGroupUpdUUGDtp) {
  return request({
    url: `/sys-manage/user-user-group/uug`,
    method: 'POST',
    data: param
  })
}

export function userUserGroupUpdUGU(param: userUserGroupUpdUGUDtp) {
  return request({
    url: `/sys-manage/user-user-group/ugu`,
    method: 'POST',
    data: param
  })
}

export function userUserGroupDel(ids: any[]) {
  return request({
    url: '/sys-manage/user-user-group',
    method: 'DELETE',
    data: ids
  })
}
