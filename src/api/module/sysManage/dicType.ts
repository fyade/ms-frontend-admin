import request from "@/api/request.ts";
import { dicTypeInsDto, dicTypeSelAllDto, dicTypeSelDto, dicTypeUpdDto } from "@/type/api/sysManage/dicType.ts";

export function dicTypeSel(params: dicTypeSelDto) {
  return request({
    url: '/sys-manage/dic-type',
    method: 'GET',
    params: params
  })
}

export function dicTypeSelAll(params: dicTypeSelAllDto) {
  return request({
    url: '/sys-manage/dic-type/all',
    method: 'GET',
    params: params
  })
}

export function dicTypeSelById(id: number) {
  return request({
    url: `/sys-manage/dic-type/${id}`,
    method: 'GET'
  })
}

export function dicTypeSelByIds(ids: any[]) {
  return request({
    url: `/sys-manage/dic-type/ids`,
    method: 'GET',
    params: ids
  })
}

export function dicTypeIns(params: dicTypeInsDto) {
  return request({
    url: '/sys-manage/dic-type',
    method: 'POST',
    data: params
  })
}

export function dicTypeUpd(params: dicTypeUpdDto) {
  return request({
    url: '/sys-manage/dic-type',
    method: 'PUT',
    data: params
  })
}

export function dicTypeInss(params: dicTypeInsDto[]) {
  return request({
    url: '/sys-manage/dic-type/s',
    method: 'POST',
    data: params
  })
}

export function dicTypeUpds(params: dicTypeUpdDto[]) {
  return request({
    url: '/sys-manage/dic-type/s',
    method: 'PUT',
    data: params
  })
}

export function dicTypeDel(ids: any[]) {
  return request({
    url: '/sys-manage/dic-type',
    method: 'DELETE',
    data: ids
  })
}