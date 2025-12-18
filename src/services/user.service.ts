import { request } from '@/lib/request';
import type { User } from '@/generated/client'; 

export const getUserProfile = () => {
  return request.get<User>(`/user/profile`);
};