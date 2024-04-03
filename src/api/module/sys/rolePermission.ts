import request from "@/api/request.ts";
import { rolePermissionInsDto, rolePermissionUpdDto } from "@/type/api/sys/rolePermission.ts";

export function rolePermissionSelAll(params: any) {
  return request({
    url: '/sys/role-permission/all',
    method: 'GET',
    params: params
  })
}

export function rolePermissionSelById(id: any) {
  return request({
    url: `/sys/role-permission/${id}`,
    method: 'GET'
  })
}

export function rolePermissionIns(params: rolePermissionInsDto) {
  return request({
    url: '/sys/role-permission',
    method: 'POST',
    data: params
  })
}

export function rolePermissionUpd(params: rolePermissionUpdDto) {
  return request({
    url: '/sys/role-permission',
    method: 'PUT',
    data: params
  })
}

export function rolePermissionDel(ids: any[]) {
  return request({
    url: '/sys/role-permission',
    method: 'DELETE',
    data: ids
  })
}