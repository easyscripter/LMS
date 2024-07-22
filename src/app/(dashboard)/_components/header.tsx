import { MobileSidebar } from './mobile-sidebar';

export const Header = () => {
  return (
    <div className="flex h-full items-center border-b bg-white p-4 shadow-md">
      <MobileSidebar />
    </div>
  );
};
