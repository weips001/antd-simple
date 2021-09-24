import { request } from 'umi';
import { CommonResult } from '@/services/data';
import { LoginParams } from './data';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(): Promise<CommonResult> {
  return request('/api/user/currentUser', {
    method: 'GET',
  });
}

export async function login(data: LoginParams): Promise<CommonResult> {
  return request('/api/user/login', {
    method: 'POST',
    data,
  });
}
