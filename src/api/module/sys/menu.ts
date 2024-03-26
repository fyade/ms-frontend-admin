import request from "@/api/request.ts";
import { pageSelDto } from "@/type/tablePage.ts";

export interface menuSelDto extends pageSelDto {
}

export interface menuInsDto {
  label: string;
  type: string;
  path: string;
  parent_id: number;
  component: string;
  icon: string;
  order_num: number;
  if_link: string;
  if_visible: string;
  if_disabled: string;
  if_public: string;
  perms: string;
  remark: string;
}

export interface menuUpdDto extends menuInsDto {
  id: number
}

export function menuSel(params?: menuSelDto) {
  return request({
    url: '/sys/menu',
    method: 'GET',
    params: params
  })
}

export function menuSelById(id: any) {
  return request({
    url: `/sys/menu/${id}`,
    method: 'GET'
  })
}

export function menuIns(params: menuInsDto) {
  return request({
    url: '/sys/menu',
    method: 'POST',
    data: params
  })
}

export function menuUpd(params: menuUpdDto) {
  return request({
    url: '/sys/menu',
    method: 'PUT',
    data: params
  })
}

export function menuDel(ids: any[]) {
  return request({
    url: '/sys/menu',
    method: 'DELETE',
    data: ids
  })
}