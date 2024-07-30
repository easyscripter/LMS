'use client';

import { SidebarRoute } from '@/types';
import { SidebarItem } from './sidebar-item';
import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';

type SidebarRoutesProps = {
  routes: SidebarRoute[];
};

export const SidebarRoutes = ({ routes }: SidebarRoutesProps) => {
  const session = useSession();

  const userRoutes = routes.filter((route) => !route.isTeacherRoute);

  return (
    <div className="flex w-full flex-col gap-y-2">
      {session.data?.user.role === Role.ADMIN || session.data?.user.role === Role.TEACHER
        ? {
            ...routes.map((route) => <SidebarItem key={route.path} {...route} />),
          }
        : userRoutes.map((route) => <SidebarItem key={route.path} {...route} />)}
    </div>
  );
};
