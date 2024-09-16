'use client';
import { SidebarRoute } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { LogOutIcon } from 'lucide-react';
import { apiService } from '@/services/apiService';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../ui/use-toast';
import { AxiosError } from 'axios';
import { Routes } from '@/enums';
import { removeTokensFromCookies } from '@/utils';

type SidebarProps = {
  logoUrl: string;
  sidebarItems: SidebarRoute[];
  username?: string;
};
export const Sidebar = ({ logoUrl, sidebarItems, username }: SidebarProps) => {
  const pathname = usePathname();
  const { toast } = useToast();
  const logoutMutation = useMutation({
    mutationFn: () => apiService.logout(),
  });
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      removeTokensFromCookies();
      router.push(Routes.SIGN_IN);
    } catch (e) {
      const error = e as Error | AxiosError;
      toast({
        title: 'Ошибка',
        description: `При выходе произошла ошибка, попробуйте ещё раз. ${error instanceof AxiosError ? error.response?.data.message : error.message}`,
      });
    }
  };
  return (
    <div className="flex h-full w-full flex-col bg-[#3C2B60] p-5">
      <div className="flex items-center justify-center">
        <Image src={logoUrl} alt="logo" width={150} height={150} />
      </div>
      <div className="mt-20 flex flex-col gap-7">
        {sidebarItems.map((item) => (
          <Link
            className={`flex items-center gap-5 rounded-md p-3 font-bold transition-all ${pathname === item.path ? 'bg-[#E0EBFF] text-black' : 'text-white'}`}
            href={item.path}
            key={item.path}
          >
            <item.icon></item.icon>
            <p>{item.title}</p>
          </Link>
        ))}
      </div>
      <div
        onClick={handleLogout}
        className="mt-auto flex cursor-pointer justify-between p-3 text-white"
      >
        <p className="font-bold text-white">{username}</p>
        <LogOutIcon className="h-6 w-6" />
      </div>
    </div>
  );
};
