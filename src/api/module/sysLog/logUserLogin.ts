import request from "@/api/request.ts";
import { logUserLoginInsDto, logUserLoginSelAllDto, logUserLoginSelDto, logUserLoginUpdDto } from "@/type/api/sysLog/logUserLogin.ts";

export function logUserLoginSel(params: logUserLoginSelDto) {
  return request({
    url: '/sys-log/log-user-login',
    method: 'GET',
    params: params
  })
}

export function logUserLoginSelAll(params: logUserLoginSelAllDto) {
  return request({
    url: '/sys-log/log-user-login/all',
    method: 'GET',
    params: params
  })
}

export function logUserLoginSelById(id: number) {
  return request({
    url: `/sys-log/log-user-login/${id}`,
    method: 'GET'
  })
}

export function logUserLoginSelByIds(ids: any[]) {
  return request({
    url: `/sys-log/log-user-login/ids`,
    method: 'GET',
    params: ids
  })
}

export function logUserLoginIns(params: logUserLoginInsDto) {
  return request({
    url: '/sys-log/log-user-login',
    method: 'POST',
    data: params
  })
}

export function logUserLoginUpd(params: logUserLoginUpdDto) {
  return request({
    url: '/sys-log/log-user-login',
    method: 'PUT',
    data: params
  })
}

export function logUserLoginInss(params: logUserLoginInsDto[]) {
  return request({
    url: '/sys-log/log-user-login/s',
    method: 'POST',
    data: params
  })
}

export function logUserLoginUpds(params: logUserLoginUpdDto[]) {
  return request({
    url: '/sys-log/log-user-login/s',
    method: 'PUT',
    data: params
  })
}

export function logUserLoginDel(ids: any[]) {
  return request({
    url: '/sys-log/log-user-login',
    method: 'DELETE',
    data: ids
  })
}
