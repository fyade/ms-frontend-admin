import request from "../../request.ts";
import { loginDto, registDto } from "@/type/api/sysManage/user.ts";
import { encrypt } from "@/utils/EncryptUtils.ts";


export function registApi(data: registDto) {
  return request({
    url: '/sys/user/regist',
    method: 'POST',
    data: data
  })
}

export function loginApi(data: loginDto) {
  return request({
    url: '/sys/user/adminlogin',
    method: 'POST',
    data: {
      ...data,
      password: encrypt(data.password)
    }
  })
}

export function getSelfInfo() {
  return request({
    url: '/sys-manage/user/self-info',
    method: 'GET',
  })
}

export function userSelList(params: any) {
  return request({
    url: '/sys-manage/user/page',
    method: 'GET',
    params: params
  })
}

export function userSelByIds(ids: any[]) {
  return request({
    url: '/sys-manage/user/ids',
    method: 'GET',
    params: ids
  })
}

export function newUser(params: any) {
  return request({
    url: '/sys-manage/user',
    method: 'POST',
    data: {
      ...params,
      password: encrypt(params.password)
    }
  })
}

export function updUser(params: any) {
  return request({
    url: '/sys-manage/user/upd-user',
    method: 'POST',
    data: params
  })
}

export function updPsd(params: any) {
  return request({
    url: '/sys-manage/user/upd-psd',
    method: 'POST',
    data: {
      oldp: encrypt(params.oldp),
      newp1: encrypt(params.newp1),
      newp2: encrypt(params.newp2)
    }
  })
}

export function resetUserPsd(params: any) {
  return request({
    url: '/sys-manage/user/admin-reset-user-psd',
    method: 'POST',
    data: {
      ...params,
      password: encrypt(params.password)
    }
  })
}