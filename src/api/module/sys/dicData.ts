import { dicDataInsDto, dicDataSelDto, dicDataUpdDto } from "@/type/api/sys/dicData.ts";
import request from "@/api/request.ts";

export function dicDataSel(params: dicDataSelDto) {
  return request({
    url: '/sys/dic-data',
    method: 'GET',
    params: params
  })
}

export function dicDataSelById(id: number) {
  return request({
    url: `/sys/dic-data/${id}`,
    method: 'GET'
  })
}

export function dicDataIns(params: dicDataInsDto) {
  return request({
    url: '/sys/dic-data',
    method: 'POST',
    data: params
  })
}

export function dicDataUpd(params: dicDataUpdDto) {
  return request({
    url: '/sys/dic-data',
    method: 'PUT',
    data: params
  })
}

export function dicDataDel(ids: any[]) {
  return request({
    url: '/sys/dic-data',
    method: 'DELETE',
    data: ids
  })
}