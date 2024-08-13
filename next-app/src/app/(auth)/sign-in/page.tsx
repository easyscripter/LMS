'use client';
import { LoginForm, LoginFormData } from '@/components/auth/loginForm';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignInPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { logIn } = useAuth();
  const handleLogin = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setIsLoading(false);
      if (response.ok) {
        const data = await response.json();
        const user = {
          authToken: data.jwt,
          ...data.user,
        };
        logIn(user);
        router.push('/');
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return <LoginForm isLoading={isLoading} onLogin={handleLogin} />;
};

export default SignInPage;
