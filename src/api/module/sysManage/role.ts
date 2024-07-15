import request from "@/api/request.ts";
import { roleInsDto, roleSelAllDto, roleSelDto, roleUpdDto } from "@/type/api/sysManage/role.ts";

export function roleSel(params: roleSelDto) {
  return request({
    url: '/sys-manage/role',
    method: 'GET',
    params: params
  })
}

export function roleSelAll(params: roleSelAllDto) {
  return request({
    url: '/sys-manage/role/all',
    method: 'GET',
    params: params
  })
}

export function roleSelById(id: number) {
  return request({
    url: `/sys-manage/role/${id}`,
    method: 'GET'
  })
}

export function roleSelByIds(ids: any[]) {
  return request({
    url: `/sys-manage/role/ids`,
    method: 'GET',
    params: ids
  })
}

export function roleIns(params: roleInsDto) {
  return request({
    url: '/sys-manage/role',
    method: 'POST',
    data: params
  })
}

export function roleUpd(params: roleUpdDto) {
  return request({
    url: '/sys-manage/role',
    method: 'PUT',
    data: params
  })
}

export function roleInss(params: roleInsDto[]) {
  return request({
    url: '/sys-manage/role/s',
    method: 'POST',
    data: params
  })
}

export function roleUpds(params: roleUpdDto[]) {
  return request({
    url: '/sys-manage/role/s',
    method: 'PUT',
    data: params
  })
}

export function roleDel(ids: any[]) {
  return request({
    url: '/sys-manage/role',
    method: 'DELETE',
    data: ids
  })
}
