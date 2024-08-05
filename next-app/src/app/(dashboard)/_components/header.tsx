'use client';
import { MobileSidebar } from './mobile-sidebar';

export const Header = () => {
  return (
    <div className="flex h-full items-center border-b bg-slate-200 p-4">
      <MobileSidebar />
      <div className="ml-auto mr-10 flex items-center">
        <p className="text-lg font-[700] text-slate-900">Привет</p>
      </div>
    </div>
  );
};
