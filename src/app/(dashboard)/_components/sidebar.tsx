'use client';

import { sideBarRoutes } from '@/config/sidebarRoutes';
import { Logo } from './logo';
import { SidebarRoutes } from './sidebar-routes';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export const Sidebar = () => {
  const logOut = () => {
    signOut({ callbackUrl: '/sign-in' });
  };
  return (
    <div className="bg-whie flex h-full flex-col overflow-y-auto border-r shadow-md">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex w-full flex-col py-6">
        <SidebarRoutes routes={sideBarRoutes} />
      </div>
      <div className="mb-2 mt-auto flex w-full">
        <button
          onClick={logOut}
          className="flex w-full items-center gap-x-2 py-4 pl-6 font-[500] text-slate-200 transition-all hover:bg-slate-300/20 hover:text-slate-600"
        >
          <div className="flex items-center gap-x-2">
            <LogOut width={22} height={22} className="text-slate-500" />
            Выйти
          </div>
        </button>
      </div>
    </div>
  );
};
