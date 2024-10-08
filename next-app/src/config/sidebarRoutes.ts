import { Routes } from '@/enums';
import { SidebarRoute } from '@/types';
import { Compass, Layout, Settings } from 'lucide-react';

export const sideBarRoutes: SidebarRoute[] = [
  {
    icon: Layout,
    title: 'Дэшборд',
    path: Routes.DASHBOARD,
  },
  {
    icon: Compass,
    title: 'Курсы',
    path: Routes.COURSES,
  },
  {
    icon: Settings,
    title: 'Настройки',
    path: Routes.SETTINGS,
  },
];
