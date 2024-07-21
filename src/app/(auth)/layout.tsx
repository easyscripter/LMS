import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  return <div className="flex h-full items-center justify-center">{children}</div>;
};

export default AuthLayout;
