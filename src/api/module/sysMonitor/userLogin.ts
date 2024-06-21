import request from "@/api/request.ts";
import { userLoginInsDto, userLoginSelAllDto, userLoginSelDto, userLoginUpdDto } from "@/type/api/sysMonitor/userLogin.ts";

export function userLoginSel(params: userLoginSelDto) {
  return request({
    url: '/sys-monitor/user-login',
    method: 'GET',
    params: params
  })
}

export function userLoginSelAll(params: userLoginSelAllDto) {
  return request({
    url: '/sys-monitor/user-login/all',
    method: 'GET',
    params: params
  })
}

export function userLoginSelById(id: number) {
  return request({
    url: `/sys-monitor/user-login/${id}`,
    method: 'GET'
  })
}

export function userLoginSelByIds(ids: any[]) {
  return request({
    url: `/sys-monitor/user-login/ids`,
    method: 'GET',
    params: ids
  })
}

export function userLoginIns(params: userLoginInsDto) {
  return request({
    url: '/sys-monitor/user-login',
    method: 'POST',
    data: params
  })
}

export function userLoginUpd(params: userLoginUpdDto) {
  return request({
    url: '/sys-monitor/user-login',
    method: 'PUT',
    data: params
  })
}

export function userLoginInss(params: userLoginInsDto[]) {
  return request({
    url: '/sys-monitor/user-login/s',
    method: 'POST',
    data: params
  })
}

export function userLoginUpds(params: userLoginUpdDto[]) {
  return request({
    url: '/sys-monitor/user-login/s',
    method: 'PUT',
    data: params
  })
}

export function userLoginDel(ids: any[]) {
  return request({
    url: '/sys-monitor/user-login',
    method: 'DELETE',
    data: ids
  })
}
