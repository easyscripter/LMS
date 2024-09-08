import { User } from '@/types';
import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const logIn = (user: User) => {
    setUser(user);
  };

  const logOut = () => {
    setUser(null);
  };

  return { user, logIn, logOut };
};
