'use client'

import { SessionProvider } from 'next-auth/react';

type ClientSessionProviderProps = {
    children: React.ReactNode;
}
export const ClientSessionProvider = ({ children }: ClientSessionProviderProps) => {
    return (<SessionProvider>{children}</SessionProvider>)
}