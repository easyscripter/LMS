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
        'text-md flex items-center gap-x-2 rounded-xl pl-6 font-[700] text-slate-950',
        isActive && 'bg-slate-950 text-slate-200',
      )}
    >
      <div className="flex items-center gap-x-3 py-4">
        <Icon
          width={32}
          height={32}
          className={cn('text-slate-950', isActive && 'text-slate-200')}
        />
        {title}
      </div>
    </button>
  );
};
