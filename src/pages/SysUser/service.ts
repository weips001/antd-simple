import { request } from 'umi';
import type { SysUserProps } from './data.d';

type ParamsType = {
  current?: number;
  pageSize?: number;
} & Partial<SysUserProps>;

export async function queryList(
  params: ParamsType,
): Promise<{ data: SysUserProps[] }> {
  return request('/aaa/queryScanRole', {
    params,
  });
}

export async function removeItem(
  roleId: string,
): Promise<{ data: { list: SysUserProps[] } }> {
  return request('/aaa/deleteScanRole', {
    method: 'GET',
    params: {
      roleId,
    },
  });
}

export async function addItem(
  data: ParamsType,
): Promise<{ data: { list: SysUserProps[] } }> {
  return request('/aaa/addScanRole', {
    method: 'POST',
    data,
  });
}

export async function updateItem(
  data: ParamsType,
): Promise<{ data: { list: SysUserProps[] } }> {
  return request('/aaa/updateScanRole', {
    method: 'POST',
    data,
  });
}
