import React from 'react';
import { db } from '@/lib/db';

type AuthLayoutProps = {
    children: React.ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
    return ( <div className='h-full flex items-center justify-center'>{children}</div> );
}
 
export default AuthLayout;