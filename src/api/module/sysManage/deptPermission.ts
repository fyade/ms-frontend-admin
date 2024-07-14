import request from "@/api/request.ts";
import {
  deptPermissionInsDto,
  deptPermissionSelAllDto,
  deptPermissionSelDto,
  deptPermissionUpdDto,
  updManyDPDto
} from "@/type/api/sysManage/deptPermission.ts";

export function deptPermissionSel(params: deptPermissionSelDto) {
  return request({
    url: '/sys-manage/dept-permission',
    method: 'GET',
    params: params
  })
}

export function deptPermissionSelAll(params: deptPermissionSelAllDto) {
  return request({
    url: '/sys-manage/dept-permission/all',
    method: 'GET',
    params: params
  })
}

export function deptPermissionSelById(id: number) {
  return request({
    url: `/sys-manage/dept-permission/${id}`,
    method: 'GET'
  })
}

export function deptPermissionSelByIds(ids: any[]) {
  return request({
    url: `/sys-manage/dept-permission/ids`,
    method: 'GET',
    params: ids
  })
}

export function deptPermissionUpdDP(data: updManyDPDto) {
  return request({
    url: `/sys-manage/dept-permission/dp`,
    method: 'POST',
    data: data
  })
}

export function deptPermissionDel(ids: any[]) {
  return request({
    url: '/sys-manage/dept-permission',
    method: 'DELETE',
    data: ids
  })
}
