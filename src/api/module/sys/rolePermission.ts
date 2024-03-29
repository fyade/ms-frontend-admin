import request from "@/api/request.ts";
import { pageSelDto } from "@/type/tablePage.ts";

export interface rolePermissionSelDto extends pageSelDto {
}

export interface rolePermissionInsDto {
  role_id: number;
  permission_id: number;
  remark: string;
}

export interface rolePermissionUpdDto extends rolePermissionInsDto {
  id: number
}

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