import request from "@/api/request.ts";
import { pageSelDto } from "@/type/tablePage.ts";

export interface userRoleSelDto extends pageSelDto {
}

export interface userRoleInsDto {
  user_id: string;
  role_id: number;
  remark: string;
}

export interface userRoleUpdDto extends userRoleInsDto {
  id: number
}

export function userRoleSel(params: userRoleSelDto) {
  return request({
    url: '/sys/user-role',
    method: 'GET',
    params: params
  })
}

export function userRoleSelById(id: any) {
  return request({
    url: `/sys/user-role/${id}`,
    method: 'GET'
  })
}

export function userRoleIns(params: userRoleInsDto) {
  return request({
    url: '/sys/user-role',
    method: 'POST',
    data: params
  })
}

export function userRoleUpd(params: userRoleUpdDto) {
  return request({
    url: '/sys/user-role',
    method: 'PUT',
    data: params
  })
}

export function userRoleDel(ids: any[]) {
  return request({
    url: '/sys/user-role',
    method: 'DELETE',
    data: ids
  })
}