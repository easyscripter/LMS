import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants';
import Cookies from 'js-cookie';
export const removeTokensFromCookies = () => {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
};
