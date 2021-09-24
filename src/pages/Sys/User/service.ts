import { request } from 'umi';
import type { RoleItemProps, BindRoleProps, SelectProps } from './data.d';

type ParamsType = {
  current?: number;
  pageSize?: number;
} & Partial<RoleItemProps>;

export async function queryList(
  params: ParamsType,
): Promise<{ data: RoleItemProps[] }> {
  return request('/api/user', {
    params,
  });
}

export async function removeItem(
  roleId: string,
): Promise<{ data: { list: RoleItemProps[] } }> {
  return request(`/api/user/${roleId}`, {
    method: 'DELETE',
  });
}

export async function addItem(
  data: ParamsType,
): Promise<{ data: { list: RoleItemProps[] } }> {
  return request('/api/user', {
    method: 'POST',
    data,
  });
}

export async function updateItem(
  data: ParamsType,
): Promise<{ data: { list: RoleItemProps[] } }> {
  return request(`/api/user/${data.id}`, {
    method: 'PUT',
    data,
  });
}

export async function getAllRole(): Promise<{
  data: SelectProps[];
}> {
  return request('/api/getAllRole', {
    method: 'GET',
  });
}

export async function bindRole(data: BindRoleProps): Promise<{ data: null }> {
  return request('/api/bindRole', {
    method: 'POST',
    data,
  });
}

export async function getRoleIdsByUser(
  userId?: string,
): Promise<{ data: string[] }> {
  return request('/api/getRoleIdsByUser', {
    method: 'POST',
    data: {
      userId,
    },
  });
}
