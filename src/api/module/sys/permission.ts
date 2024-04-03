import request from "@/api/request.ts";
import { permissionInsDto, permissionSelDto, permissionUpdDto } from "@/type/api/sys/permission.ts";

export function permissionSel(params: permissionSelDto) {
  return request({
    url: '/sys/permission',
    method: 'GET',
    params: params
  })
}

export function permissionSelById(id: any) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'GET'
  })
}

export function permissionIns(params: permissionInsDto) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data: params
  })
}

export function permissionUpd(params: permissionUpdDto) {
  return request({
    url: '/sys/permission',
    method: 'PUT',
    data: params
  })
}

export function permissionDel(ids: any[]) {
  return request({
    url: '/sys/permission',
    method: 'DELETE',
    data: ids
  })
}