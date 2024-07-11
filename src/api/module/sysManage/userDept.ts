import request from "@/api/request.ts";
import {
  userDeptSelAllDto,
  userDeptSelDto,
  userDeptUpdDUDto,
  userDeptUpdUDDto
} from "@/type/api/sysManage/userDept.ts";

export function userDeptSel(params: userDeptSelDto) {
  return request({
    url: '/sys-manage/user-dept',
    method: 'GET',
    params: params
  })
}

export function userDeptSelAll(params: userDeptSelAllDto) {
  return request({
    url: '/sys-manage/user-dept/all',
    method: 'GET',
    params: params
  })
}

export function userDeptSelById(id: number) {
  return request({
    url: `/sys-manage/user-dept/${id}`,
    method: 'GET'
  })
}

export function userDeptSelByIds(ids: any[]) {
  return request({
    url: `/sys-manage/user-dept/ids`,
    method: 'GET',
    params: ids
  })
}

export function userDeptUpdUD(params: userDeptUpdUDDto) {
  return request({
    url: `/sys-manage/user-dept/ud`,
    method: 'POST',
    data: params
  })
}

export function userDeptUpdDU(params: userDeptUpdDUDto) {
  return request({
    url: `/sys-manage/user-dept/du`,
    method: 'POST',
    data: params
  })
}

export function userDeptDel(ids: any[]) {
  return request({
    url: '/sys-manage/user-dept',
    method: 'DELETE',
    data: ids
  })
}
