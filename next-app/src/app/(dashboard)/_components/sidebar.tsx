'use client';

import { sideBarRoutes } from '@/config/sidebarRoutes';
import { Logo } from './logo';
import { SidebarRoutes } from './sidebar-routes';
import { LogOut } from 'lucide-react';

export const Sidebar = () => {
  const logOut = () => {};
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-slate-200 shadow-md">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex w-full flex-col px-6 py-6">
        <SidebarRoutes routes={sideBarRoutes} />
      </div>
      <div className="mb-2 mt-auto flex w-full">
        <button
          onClick={logOut}
          className="text-md flex w-full items-center gap-x-2 py-4 pl-6 font-[500] text-slate-950 transition-all"
        >
          <div className="flex items-center gap-x-2">
            <LogOut width={32} height={32} className="text-slate-950" />
            Выйти
          </div>
        </button>
      </div>
    </div>
  );
};
