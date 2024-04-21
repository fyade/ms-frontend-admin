import request from "../../request.ts";
import { loginDto, registDto } from "@/type/api/sys/user.ts";


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
    url: '/sys/user/page',
    method: 'GET',
    params: params
  })
}

export function newUser(params: any) {
  return request({
    url: '/sys/user',
    method: 'POST',
    data: params
  })
}

export function resetUserPsd(params: any) {
  return request({
    url: '/sys/user/resetpsd',
    method: 'POST',
    data: params
  })
}