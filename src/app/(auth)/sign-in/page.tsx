'use client';
import React, { useState } from 'react';
import { LoginForm, LoginFormData } from '@/components/auth/loginForm';
import { useToast } from '@/components/ui/use-toast';
import { signIn } from 'next-auth/react';

const SignInPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    const user = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    setIsLoading(false);
    if (user?.error) {
      toast({
        title: 'Ошибка',
        description: user.error,
        variant: 'destructive',
      });
      return;
    }
  };

  return <LoginForm isLoading={isLoading} onLogin={handleLogin} />;
};

export default SignInPage;
