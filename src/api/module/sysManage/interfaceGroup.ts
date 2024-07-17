import request from "@/api/request.ts";
import { interfaceGroupInsDto, interfaceGroupSelAllDto, interfaceGroupSelDto, interfaceGroupUpdDto } from "@/type/api/sysManage/interfaceGroup.ts";

export function interfaceGroupSel(params: interfaceGroupSelDto) {
  return request({
    url: '/sys-manage/interface-group',
    method: 'GET',
    params: params
  })
}

export function interfaceGroupSelAll(params: interfaceGroupSelAllDto) {
  return request({
    url: '/sys-manage/interface-group/all',
    method: 'GET',
    params: params
  })
}

export function interfaceGroupSelById(id: number) {
  return request({
    url: `/sys-manage/interface-group/${id}`,
    method: 'GET'
  })
}

export function interfaceGroupSelByIds(ids: any[]) {
  return request({
    url: `/sys-manage/interface-group/ids`,
    method: 'GET',
    params: ids
  })
}

export function interfaceGroupIns(params: interfaceGroupInsDto) {
  return request({
    url: '/sys-manage/interface-group',
    method: 'POST',
    data: params
  })
}

export function interfaceGroupUpd(params: interfaceGroupUpdDto) {
  return request({
    url: '/sys-manage/interface-group',
    method: 'PUT',
    data: params
  })
}

export function interfaceGroupInss(params: interfaceGroupInsDto[]) {
  return request({
    url: '/sys-manage/interface-group/s',
    method: 'POST',
    data: params
  })
}

export function interfaceGroupUpds(params: interfaceGroupUpdDto[]) {
  return request({
    url: '/sys-manage/interface-group/s',
    method: 'PUT',
    data: params
  })
}

export function interfaceGroupDel(ids: any[]) {
  return request({
    url: '/sys-manage/interface-group',
    method: 'DELETE',
    data: ids
  })
}
