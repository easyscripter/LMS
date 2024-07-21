"use client"
import React from 'react';
import { LoginForm, LoginFormData } from '@/components/auth/loginForm';
import { useToast } from '@/components/ui/use-toast';
import { signIn } from 'next-auth/react';

const SignInPage = () => {
    const {toast} = useToast();
    const handleLogin =  async (data: LoginFormData) => {
        const user = await signIn('credentials', {
            username: data.username,
            password: data.password,
            redirect: false
        });
        if (user?.error) {
            toast({
                title: 'Ошибка',
                description: user.error,
                variant: 'destructive',
            });
            return;
        }
    }

    return (
        <LoginForm onLogin={handleLogin}/>
    );
}
 
export default SignInPage;