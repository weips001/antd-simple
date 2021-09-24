import { request } from 'umi';
import type { RoleItemProps } from './data.d';

type ParamsType = {
  current?: number;
  pageSize?: number;
} & Partial<RoleItemProps>;

export async function queryList(
  params: ParamsType,
): Promise<{ data: RoleItemProps[] }> {
  return request('/api/role', {
    params,
  });
}

export async function removeItem(
  roleId: string,
): Promise<{ data: { list: RoleItemProps[] } }> {
  return request(`/api/role/${roleId}`, {
    method: 'DELETE',
  });
}

export async function addItem(
  data: ParamsType,
): Promise<{ data: { list: RoleItemProps[] } }> {
  return request('/api/role', {
    method: 'POST',
    data,
  });
}

export async function updateItem(
  data: ParamsType,
): Promise<{ data: { list: RoleItemProps[] } }> {
  return request(`/api/role/${data.id}`, {
    method: 'PUT',
    data,
  });
}

export async function getAllScanRole(): Promise<{
  data: SelectProps[];
}> {
  return request('/api/allAuth', {
    method: 'GET',
  });
}

export async function assignClientSystemRole(
  data: BindRoleProps,
): Promise<{ data: { list: SysItemProps[] } }> {
  return request('/api/bindAuth', {
    method: 'POST',
    data,
  });
}

export async function queryClientSystemRole(
  roleId?: string,
): Promise<{ data: BindRoleProps }> {
  return request('/api/getAuthFromRole', {
    method: 'POST',
    data: {
      roleId,
    },
  });
}
