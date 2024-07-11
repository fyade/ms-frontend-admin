import request from "@/api/request.ts";
import { deptInsDto, deptSelAllDto, deptSelDto, deptUpdDto } from "@/type/api/sysManage/dept.ts";

export function deptSel(params: deptSelDto) {
  return request({
    url: '/sys-manage/dept',
    method: 'GET',
    params: params
  })
}

export function deptSelAll(params: deptSelAllDto) {
  return request({
    url: '/sys-manage/dept/all',
    method: 'GET',
    params: params
  })
}

export function deptSelById(id: number) {
  return request({
    url: `/sys-manage/dept/${id}`,
    method: 'GET'
  })
}

export function deptSelByIds(ids: any[]) {
  return request({
    url: `/sys-manage/dept/ids`,
    method: 'GET',
    params: ids
  })
}

export function deptIns(params: deptInsDto) {
  return request({
    url: '/sys-manage/dept',
    method: 'POST',
    data: params
  })
}

export function deptUpd(params: deptUpdDto) {
  return request({
    url: '/sys-manage/dept',
    method: 'PUT',
    data: params
  })
}

export function deptInss(params: deptInsDto[]) {
  return request({
    url: '/sys-manage/dept/s',
    method: 'POST',
    data: params
  })
}

export function deptUpds(params: deptUpdDto[]) {
  return request({
    url: '/sys-manage/dept/s',
    method: 'PUT',
    data: params
  })
}

export function deptDel(ids: any[]) {
  return request({
    url: '/sys-manage/dept',
    method: 'DELETE',
    data: ids
  })
}
