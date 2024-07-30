import { Routes } from '@/enums';
import { SidebarRoute } from '@/types';
import { Compass, LaptopMinimal, Layout, Settings } from 'lucide-react';

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
  {
    icon: LaptopMinimal,
    title: 'Мои курсы',
    path: Routes.MY_COURSES,
    isTeacherRoute: true,
  },
];
