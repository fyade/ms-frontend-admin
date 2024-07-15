import request from "@/api/request.ts";
import { codeGenTableInsDto, codeGenTableSelAllDto, codeGenTableSelDto, codeGenTableUpdDto } from "@/type/api/sysUtil/codeGenTable.ts";

export function codeGenTableSel(params: codeGenTableSelDto) {
  return request({
    url: '/sys-util/code-gen-table',
    method: 'GET',
    params: params
  })
}

export function codeGenTableSelAll(params: codeGenTableSelAllDto) {
  return request({
    url: '/sys-util/code-gen-table/all',
    method: 'GET',
    params: params
  })
}

export function codeGenTableSelById(id: number) {
  return request({
    url: `/sys-util/code-gen-table/${id}`,
    method: 'GET'
  })
}

export function codeGenTableSelByIds(ids: any[]) {
  return request({
    url: `/sys-util/code-gen-table/ids`,
    method: 'GET',
    params: ids
  })
}

export function codeGenTableIns(params: codeGenTableInsDto) {
  return request({
    url: '/sys-util/code-gen-table',
    method: 'POST',
    data: params
  })
}

export function codeGenTableUpd(params: codeGenTableUpdDto) {
  return request({
    url: '/sys-util/code-gen-table',
    method: 'PUT',
    data: params
  })
}

export function codeGenTableInss(params: codeGenTableInsDto[]) {
  return request({
    url: '/sys-util/code-gen-table/s',
    method: 'POST',
    data: params
  })
}

export function codeGenTableUpds(params: codeGenTableUpdDto[]) {
  return request({
    url: '/sys-util/code-gen-table/s',
    method: 'PUT',
    data: params
  })
}

export function codeGenTableDel(ids: any[]) {
  return request({
    url: '/sys-util/code-gen-table',
    method: 'DELETE',
    data: ids
  })
}
