import { request } from 'umi';
import type { SysItemProps } from './data.d';

type ParamsType = {
  current?: number;
  pageSize?: number;
} & Partial<SysItemProps>;

export async function queryList(
  params: ParamsType,
): Promise<{ data: SysItemProps[] }> {
  return request('/aaa/queryScanRole', {
    params,
  });
}

export async function removeItem(
  roleId: string,
): Promise<{ data: { list: SysItemProps[] } }> {
  return request('/aaa/deleteScanRole', {
    method: 'GET',
    params: {
      roleId,
    },
  });
}

export async function addItem(
  data: ParamsType,
): Promise<{ data: { list: SysItemProps[] } }> {
  return request('/aaa/addScanRole', {
    method: 'POST',
    data,
  });
}

export async function updateItem(
  data: ParamsType,
): Promise<{ data: { list: SysItemProps[] } }> {
  return request('/aaa/updateScanRole', {
    method: 'POST',
    data,
  });
}
