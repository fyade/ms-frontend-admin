import request from "@/api/request.ts";
import { pageSelDto } from "@/type/tablePage.ts";

export interface roleSelDto extends pageSelDto {
}

export interface roleInsDto {
  label: string;
  order_num: number;
  remark: string;
}

export interface roleUpdDto extends roleInsDto {
  id: number
}

export function roleSel(params: roleSelDto) {
  return request({
    url: '/sys/role',
    method: 'GET',
    params: params
  })
}

export function roleSelAll() {
  return request({
    url: '/sys/role/all',
    method: 'GET'
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