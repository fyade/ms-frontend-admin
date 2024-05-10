import request from "@/api/request.ts";
import { permissionInsDto, permissionSelDto, permissionUpdDto } from "@/type/api/sysManage/permission.ts";

export function permissionSel(params: permissionSelDto) {
  return request({
    url: '/sys-manage/permission',
    method: 'GET',
    params: params
  })
}

export function permissionSelById(id: any) {
  return request({
    url: `/sys-manage/permission/${id}`,
    method: 'GET'
  })
}

export function permissionIns(params: permissionInsDto) {
  return request({
    url: '/sys-manage/permission',
    method: 'POST',
    data: params
  })
}

export function permissionUpd(params: permissionUpdDto) {
  return request({
    url: '/sys-manage/permission',
    method: 'PUT',
    data: params
  })
}

export function permissionDel(ids: any[]) {
  return request({
    url: '/sys-manage/permission',
    method: 'DELETE',
    data: ids
  })
}