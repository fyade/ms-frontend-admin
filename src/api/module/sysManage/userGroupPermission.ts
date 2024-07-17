import request from "@/api/request.ts";
import {
  userGroupPermissionInsDto,
  userGroupPermissionSelAllDto,
  userGroupPermissionSelDto,
  userGroupPermissionUpdDto
} from "@/type/api/sysManage/userGroupPermission.ts";

export function userGroupPermissionSel(params: userGroupPermissionSelDto) {
  return request({
    url: '/sys-manage/user-group-permission',
    method: 'GET',
    params: params
  })
}

export function userGroupPermissionSelAll(params: userGroupPermissionSelAllDto) {
  return request({
    url: '/sys-manage/user-group-permission/all',
    method: 'GET',
    params: params
  })
}

export function userGroupPermissionSelById(id: number) {
  return request({
    url: `/sys-manage/user-group-permission/${id}`,
    method: 'GET'
  })
}

export function userGroupPermissionSelByIds(ids: any[]) {
  return request({
    url: `/sys-manage/user-group-permission/ids`,
    method: 'GET',
    params: ids
  })
}

export function userGroupPermissionIns(params: userGroupPermissionInsDto) {
  delete params.permissionTime
  return request({
    url: '/sys-manage/user-group-permission',
    method: 'POST',
    data: params
  })
}

export function userGroupPermissionUpd(params: userGroupPermissionUpdDto) {
  delete params.permissionTime
  return request({
    url: '/sys-manage/user-group-permission',
    method: 'PUT',
    data: params
  })
}

export function userGroupPermissionInss(params: userGroupPermissionInsDto[]) {
  params.forEach(param => {
    delete param.permissionTime
  })
  return request({
    url: '/sys-manage/user-group-permission/s',
    method: 'POST',
    data: params
  })
}

export function userGroupPermissionUpds(params: userGroupPermissionUpdDto[]) {
  params.forEach(param => {
    delete param.permissionTime
  })
  return request({
    url: '/sys-manage/user-group-permission/s',
    method: 'PUT',
    data: params
  })
}

export function userGroupPermissionDel(ids: any[]) {
  return request({
    url: '/sys-manage/user-group-permission',
    method: 'DELETE',
    data: ids
  })
}
