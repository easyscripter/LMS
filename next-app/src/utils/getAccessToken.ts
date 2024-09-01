import { ACCESS_TOKEN } from '@/constants';
import Cookies from 'js-cookie';
export const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN) || null;
};
