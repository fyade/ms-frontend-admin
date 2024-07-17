import request from "@/api/request.ts";
import { interfaceInsDto, interfaceSelAllDto, interfaceSelDto, interfaceUpdDto } from "@/type/api/sysManage/interface.ts";

export function interfaceSel(params: interfaceSelDto) {
  return request({
    url: '/sys-manage/interface',
    method: 'GET',
    params: params
  })
}

export function interfaceSelAll(params: interfaceSelAllDto) {
  return request({
    url: '/sys-manage/interface/all',
    method: 'GET',
    params: params
  })
}

export function interfaceSelById(id: number) {
  return request({
    url: `/sys-manage/interface/${id}`,
    method: 'GET'
  })
}

export function interfaceSelByIds(ids: any[]) {
  return request({
    url: `/sys-manage/interface/ids`,
    method: 'GET',
    params: ids
  })
}

export function interfaceIns(params: interfaceInsDto) {
  return request({
    url: '/sys-manage/interface',
    method: 'POST',
    data: params
  })
}

export function interfaceUpd(params: interfaceUpdDto) {
  return request({
    url: '/sys-manage/interface',
    method: 'PUT',
    data: params
  })
}

export function interfaceInss(params: interfaceInsDto[]) {
  return request({
    url: '/sys-manage/interface/s',
    method: 'POST',
    data: params
  })
}

export function interfaceUpds(params: interfaceUpdDto[]) {
  return request({
    url: '/sys-manage/interface/s',
    method: 'PUT',
    data: params
  })
}

export function interfaceDel(ids: any[]) {
  return request({
    url: '/sys-manage/interface',
    method: 'DELETE',
    data: ids
  })
}
