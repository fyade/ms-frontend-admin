import request from "@/api/request.ts";

export function getDbInfo(params?: any) {
  return request({
    url: '/sys-util/code-generation',
    method: 'GET',
    params
  })
}

// ----- ----- ----- ----- table ----- ----- ----- -----
export function codeGenTableSelPage(params: any) {
  return request({
    url: '/sys-util/code-gen-table',
    method: 'GET',
    params
  })
}

export function codeGenTableSelOne(id: any) {
  return request({
    url: `/sys-util/code-gen-table/${id}`,
    method: 'GET',
  })
}

export function codeGenTableSelMore(params: any) {
  return request({
    url: '/sys-util/code-gen-table/ids',
    method: 'GET',
    params
  })
}

export function codeGenTableIns(data: any) {
  return request({
    url: '/sys-util/code-gen-table',
    method: 'POST',
    data
  })
}

export function codeGenTableInss(data: any) {
  return request({
    url: '/sys-util/code-gen-table/s',
    method: 'POST',
    data
  })
}

export function codeGenTableUpd(data: any) {
  return request({
    url: '/sys-util/code-gen-table',
    method: 'PUT',
    data
  })
}

export function codeGenTableUpds(data: any) {
  return request({
    url: '/sys-util/code-gen-table/s',
    method: 'PUT',
    data
  })
}

export function codeGenTableDel(ids: any[]) {
  return request({
    url: '/sys-util/code-gen-table',
    method: 'DELETE',
    data: ids
  })
}

// ----- ----- ----- ----- column ----- ----- ----- -----
export function codeGenColumnSelPage(params: any) {
  return request({
    url: '/sys-util/code-gen-column',
    method: 'GET',
    params
  })
}

export function codeGenColumnSelOne(id: any) {
  return request({
    url: `/sys-util/code-gen-column/${id}`,
    method: 'GET',
  })
}

export function codeGenColumnSelMore(params: any) {
  return request({
    url: '/sys-util/code-gen-column/ids',
    method: 'GET',
    params
  })
}

export function codeGenColumnIns(data: any) {
  return request({
    url: '/sys-util/code-gen-column',
    method: 'POST',
    data
  })
}

export function codeGenColumnInss(data: any) {
  return request({
    url: '/sys-util/code-gen-column/s',
    method: 'POST',
    data
  })
}

export function codeGenColumnUpd(data: any) {
  return request({
    url: '/sys-util/code-gen-column',
    method: 'PUT',
    data
  })
}

export function codeGenColumnUpds(data: any) {
  return request({
    url: '/sys-util/code-gen-column/s',
    method: 'PUT',
    data
  })
}

export function codeGenColumnDel(ids: any[]) {
  return request({
    url: '/sys-util/code-gen-column',
    method: 'DELETE',
    data: ids
  })
}
