'use client';

import { SidebarRoute } from '@/types';
import { SidebarItem } from './sidebar-item';

type SidebarRoutesProps = {
  routes: SidebarRoute[];
};

export const SidebarRoutes = ({ routes }: SidebarRoutesProps) => {
  return (
    <div className="flex w-full flex-col gap-y-2">
      {routes.map((route) => (
        <SidebarItem key={route.path} {...route} />
      ))}
    </div>
  );
};
