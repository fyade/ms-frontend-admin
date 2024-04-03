import request from "@/api/request.ts";
import { roleInsDto, roleSelDto, roleSelDto2, roleUpdDto } from "@/type/api/sys/role.ts";

export function roleSel(params: roleSelDto) {
  return request({
    url: '/sys/role',
    method: 'GET',
    params: params
  })
}

export function roleSelAll(params?: roleSelDto2) {
  return request({
    url: '/sys/role/all',
    method: 'GET',
    params: params
  })
}

export function roleSelById(id: any) {
  return request({
    url: `/sys/role/${id}`,
    method: 'GET'
  })
}

export function roleIns(params: roleInsDto) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data: params
  })
}

export function roleUpd(params: roleUpdDto) {
  return request({
    url: '/sys/role',
    method: 'PUT',
    data: params
  })
}

export function roleDel(ids: any[]) {
  return request({
    url: '/sys/role',
    method: 'DELETE',
    data: ids
  })
}