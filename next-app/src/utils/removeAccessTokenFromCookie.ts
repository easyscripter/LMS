import { ACCESS_TOKEN } from '@/constants';
import Cookies from 'js-cookie';
export const removeAccessTokenFromCookie = () => {
  Cookies.remove(ACCESS_TOKEN);
};
