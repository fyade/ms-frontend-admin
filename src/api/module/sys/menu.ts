import request from "@/api/request.ts";
import { menuInsDto, menuSelDto, menuUpdDto } from "@/type/api/sys/menu.ts";

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