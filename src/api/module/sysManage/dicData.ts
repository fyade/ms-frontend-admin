import { dicDataInsDto, dicDataSelAllDto, dicDataSelDto, dicDataUpdDto } from "@/type/api/sysManage/dicData.ts";
import request from "@/api/request.ts";

export function dicDataSel(params: dicDataSelDto) {
  return request({
    url: '/sys-manage/dic-data',
    method: 'GET',
    params: params
  })
}

export function dicDataSelAll(params: dicDataSelAllDto) {
  return request({
    url: '/sys-manage/dic-data/all',
    method: 'GET',
    params: params
  })
}

export function dicDataSelById(id: number) {
  return request({
    url: `/sys-manage/dic-data/${id}`,
    method: 'GET'
  })
}

export function dicDataSelByIds(ids: any[]) {
  return request({
    url: `/sys-manage/dic-data/ids`,
    method: 'GET',
    params: ids
  })
}

export function dicDataIns(params: dicDataInsDto) {
  return request({
    url: '/sys-manage/dic-data',
    method: 'POST',
    data: params
  })
}

export function dicDataUpd(params: dicDataUpdDto) {
  return request({
    url: '/sys-manage/dic-data',
    method: 'PUT',
    data: params
  })
}

export function dicDataInss(params: dicDataInsDto[]) {
  return request({
    url: '/sys-manage/dic-data/s',
    method: 'POST',
    data: params
  })
}

export function dicDataUpds(params: dicDataUpdDto[]) {
  return request({
    url: '/sys-manage/dic-data/s',
    method: 'PUT',
    data: params
  })
}

export function dicDataDel(ids: any[]) {
  return request({
    url: '/sys-manage/dic-data',
    method: 'DELETE',
    data: ids
  })
}