import { COOKIES_USER } from '@/constants';
import { UserData } from '@/types';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const cookie = Cookies.get(COOKIES_USER);
    const parsedCookies = JSON.parse(cookie || '{}') as UserData;
    setUser(parsedCookies);

    const storageEventListener = (event: StorageEvent) => {
      if (event.key === COOKIES_USER) {
        const user = JSON.parse(event.newValue || '{}') as UserData;
        setUser(user);
      }
    };
    window.addEventListener('storage', storageEventListener);
    return () => window.removeEventListener('storage', storageEventListener);
  }, []);

  const logIn = (user: UserData) => {
    Cookies.set(COOKIES_USER, JSON.stringify(user), { expires: 7 });
    setUser(user);
  };

  const logOut = () => {
    Cookies.remove(COOKIES_USER);
    setUser(null);
  };

  return { user, logIn, logOut };
};
