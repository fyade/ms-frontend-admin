import request from "../../request.ts";
import { loginDto, registDto } from "@/type/api/sysManage/user.ts";


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
    data: data
  })
}

export function userSelList(params: any) {
  return request({
    url: '/sys-manage/user/page',
    method: 'GET',
    params: params
  })
}

export function newUser(params: any) {
  return request({
    url: '/sys-manage/user',
    method: 'POST',
    data: params
  })
}

export function resetUserPsd(params: any) {
  return request({
    url: '/sys-manage/user/resetpsd',
    method: 'POST',
    data: params
  })
}