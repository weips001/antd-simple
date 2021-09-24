import { request } from 'umi';
import type { AuthItemProps } from './data.d';

type ParamsType = {
  current?: number;
  pageSize?: number;
} & Partial<AuthItemProps>;

export async function queryList(
  params: ParamsType,
): Promise<{ data: AuthItemProps[] }> {
  return request('/api/place', {
    params,
  });
}

export async function removeItem(
  roleId: string,
): Promise<{ data: { list: AuthItemProps[] } }> {
  return request(`/api/place/${roleId}`, {
    method: 'DELETE',
  });
}

export async function addItem(
  data: ParamsType,
): Promise<{ data: { list: AuthItemProps[] } }> {
  return request('/api/place', {
    method: 'POST',
    data,
  });
}

export async function updateItem(
  data: ParamsType,
): Promise<{ data: { list: AuthItemProps[] } }> {
  return request(`/api/place/${data.id}`, {
    method: 'PUT',
    data,
  });
}
