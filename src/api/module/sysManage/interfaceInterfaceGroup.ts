import request from "@/api/request.ts";
import {
  interfaceInterfaceGroupInsDto,
  interfaceInterfaceGroupSelAllDto,
  interfaceInterfaceGroupSelDto,
  interfaceInterfaceGroupUpdDto, interfaceInterfaceGroupUpdIGIDto,
  interfaceInterfaceGroupUpdIIGDto
} from "@/type/api/sysManage/interfaceInterfaceGroup.ts";

export function interfaceInterfaceGroupSel(params: interfaceInterfaceGroupSelDto) {
  return request({
    url: '/sys-manage/interface-interface-group',
    method: 'GET',
    params: params
  })
}

export function interfaceInterfaceGroupSelAll(params: interfaceInterfaceGroupSelAllDto) {
  return request({
    url: '/sys-manage/interface-interface-group/all',
    method: 'GET',
    params: params
  })
}

export function interfaceInterfaceGroupSelById(id: number) {
  return request({
    url: `/sys-manage/interface-interface-group/${id}`,
    method: 'GET'
  })
}

export function interfaceInterfaceGroupSelByIds(ids: any[]) {
  return request({
    url: `/sys-manage/interface-interface-group/ids`,
    method: 'GET',
    params: ids
  })
}

// export function interfaceInterfaceGroupIns(params: interfaceInterfaceGroupInsDto) {
//   return request({
//     url: '/sys-manage/interface-interface-group',
//     method: 'POST',
//     data: params
//   })
// }
//
// export function interfaceInterfaceGroupUpd(params: interfaceInterfaceGroupUpdDto) {
//   return request({
//     url: '/sys-manage/interface-interface-group',
//     method: 'PUT',
//     data: params
//   })
// }
//
// export function interfaceInterfaceGroupInss(params: interfaceInterfaceGroupInsDto[]) {
//   return request({
//     url: '/sys-manage/interface-interface-group/s',
//     method: 'POST',
//     data: params
//   })
// }
//
// export function interfaceInterfaceGroupUpds(params: interfaceInterfaceGroupUpdDto[]) {
//   return request({
//     url: '/sys-manage/interface-interface-group/s',
//     method: 'PUT',
//     data: params
//   })
// }

export function interfaceInterfaceGroupUpdIIG(params: interfaceInterfaceGroupUpdIIGDto) {
  return request({
    url: '/sys-manage/interface-interface-group/iig',
    method: 'POST',
    data: params
  })
}

export function interfaceInterfaceGroupUpdIGI(params: interfaceInterfaceGroupUpdIGIDto) {
  return request({
    url: '/sys-manage/interface-interface-group/igi',
    method: 'POST',
    data: params
  })
}

export function interfaceInterfaceGroupDel(ids: any[]) {
  return request({
    url: '/sys-manage/interface-interface-group',
    method: 'DELETE',
    data: ids
  })
}
