import request from "@/api/request.ts";
import { userGroupInsDto, userGroupSelAllDto, userGroupSelDto, userGroupUpdDto } from "@/type/api/sysManage/userGroup.ts";

export function userGroupSel(params: userGroupSelDto) {
  return request({
    url: '/sys-manage/user-group',
    method: 'GET',
    params: params
  })
}

export function userGroupSelAll(params: userGroupSelAllDto) {
  return request({
    url: '/sys-manage/user-group/all',
    method: 'GET',
    params: params
  })
}

export function userGroupSelById(id: number) {
  return request({
    url: `/sys-manage/user-group/${id}`,
    method: 'GET'
  })
}

export function userGroupSelByIds(ids: any[]) {
  return request({
    url: `/sys-manage/user-group/ids`,
    method: 'GET',
    params: ids
  })
}

export function userGroupIns(params: userGroupInsDto) {
  return request({
    url: '/sys-manage/user-group',
    method: 'POST',
    data: params
  })
}

export function userGroupUpd(params: userGroupUpdDto) {
  return request({
    url: '/sys-manage/user-group',
    method: 'PUT',
    data: params
  })
}

export function userGroupInss(params: userGroupInsDto[]) {
  return request({
    url: '/sys-manage/user-group/s',
    method: 'POST',
    data: params
  })
}

export function userGroupUpds(params: userGroupUpdDto[]) {
  return request({
    url: '/sys-manage/user-group/s',
    method: 'PUT',
    data: params
  })
}

export function userGroupDel(ids: any[]) {
  return request({
    url: '/sys-manage/user-group',
    method: 'DELETE',
    data: ids
  })
}
