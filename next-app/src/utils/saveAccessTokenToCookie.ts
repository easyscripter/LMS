import { ACCESS_TOKEN } from '@/constants';
import Cookies from 'js-cookie';
export const saveAccessTokenToCookie = (accessToken: string) => {
  Cookies.set(ACCESS_TOKEN, accessToken, {
    domain: process.env.NEXT_DOMAIN,
    sameSite: 'strict',
    expires: 1,
  });
};
