import request from "@/api/request.ts";
import { codeGenColumnInsDto, codeGenColumnSelAllDto, codeGenColumnSelDto, codeGenColumnUpdDto } from "@/type/api/sysUtil/codeGenColumn.ts";

export function codeGenColumnSel(params: codeGenColumnSelDto) {
  return request({
    url: '/sys-util/code-gen-column',
    method: 'GET',
    params: params
  })
}

export function codeGenColumnSelAll(params: codeGenColumnSelAllDto) {
  return request({
    url: '/sys-util/code-gen-column/all',
    method: 'GET',
    params: params
  })
}

export function codeGenColumnSelById(id: number) {
  return request({
    url: `/sys-util/code-gen-column/${id}`,
    method: 'GET'
  })
}

export function codeGenColumnSelByIds(ids: any[]) {
  return request({
    url: `/sys-util/code-gen-column/ids`,
    method: 'GET',
    params: ids
  })
}

export function codeGenColumnIns(params: codeGenColumnInsDto) {
  return request({
    url: '/sys-util/code-gen-column',
    method: 'POST',
    data: params
  })
}

export function codeGenColumnUpd(params: codeGenColumnUpdDto) {
  return request({
    url: '/sys-util/code-gen-column',
    method: 'PUT',
    data: params
  })
}

export function codeGenColumnInss(params: codeGenColumnInsDto[]) {
  return request({
    url: '/sys-util/code-gen-column/s',
    method: 'POST',
    data: params
  })
}

export function codeGenColumnUpds(params: codeGenColumnUpdDto[]) {
  return request({
    url: '/sys-util/code-gen-column/s',
    method: 'PUT',
    data: params
  })
}

export function codeGenColumnDel(ids: any[]) {
  return request({
    url: '/sys-util/code-gen-column',
    method: 'DELETE',
    data: ids
  })
}
