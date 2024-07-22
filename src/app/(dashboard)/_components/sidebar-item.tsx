'use client';

import { Routes } from '@/enums';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

type SidebarItemProps = {
  icon: React.ElementType;
  title: string;
  path: string;
};
export const SidebarItem = ({ icon: Icon, title, path }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === Routes.DASHBOARD && path === Routes.DASHBOARD) ||
    pathname.startsWith(`${path}/`) ||
    pathname === path;

  const onClick = () => {
    router.push(path);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-x-2 pl-6 font-[500] text-slate-200 transition-all hover:bg-slate-300/20 hover:text-slate-600',
        isActive && 'bg-sky-200/20 text-sky-700 hover:bg-sky-200/20 hover:text-sky-700',
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon width={22} height={22} className={cn('text-slate-500', isActive && 'text-sky-700')} />
        {title}
      </div>
      <div
        className={cn(
          'ml-auto h-full border-2 border-sky-700 opacity-0 transition-opacity',
          isActive && 'opacity-100',
        )}
      >
        {}
      </div>
    </button>
  );
};
