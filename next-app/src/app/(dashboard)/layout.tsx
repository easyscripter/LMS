'use client';
import { Sidebar } from '@/components/Siderbar/Siderbar';
import { sideBarRoutes } from '@/config';
import { useGetUser } from '@/queries/useGetUser';

type DahsBoardLayoutProps = {
  children: React.ReactNode;
};
const DashBoardLayout = ({ children }: DahsBoardLayoutProps) => {
  const { data } = useGetUser(); 
  return (
    <div className="flex h-full">
      <div className="h-full w-[12%] md:w-[8%] lg:w-[14%]">
        <Sidebar username={data?.name} logoUrl="/logo.svg" sidebarItems={sideBarRoutes} />
      </div>
      <div className="h-full w-[88%] md:w-[92%] lg:w-[86%]">{children}</div>
    </div>
  );
};

export default DashBoardLayout;
