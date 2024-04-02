import request from "../../request.ts";

export interface loginDto {
  username: string
  password: string
}

export interface registDto extends loginDto {
}

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