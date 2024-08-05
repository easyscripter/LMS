'use client';
import React, { useState } from 'react';
import { LoginForm, LoginFormData } from '@/components/auth/loginForm';
import { useRouter } from 'next/navigation';
import { Routes } from '@/enums';

const SignInPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (data: LoginFormData) => {
    console.log(data);
    setIsLoading(true);
    router.push(Routes.DASHBOARD);
  };

  return <LoginForm isLoading={isLoading} onLogin={handleLogin} />;
};

export default SignInPage;
