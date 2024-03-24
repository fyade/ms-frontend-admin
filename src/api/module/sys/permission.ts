import request from "@/api/request.ts";
import { pageSelDto } from "@/type/tablePage.ts";

export interface permissionSelDto extends pageSelDto {
}

export interface permissionInsDto {
  label: string;
  menu_id: number;
  order_num: number;
  remark: string;
}

export interface permissionUpdDto extends permissionInsDto {
  id: number
}

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