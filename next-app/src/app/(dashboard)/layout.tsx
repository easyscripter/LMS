import { Header } from './_components/header';
import { Sidebar } from './_components/sidebar';

type DahsBoardLayoutProps = {
  children: React.ReactNode;
};
const DahsBoardLayout = ({ children }: DahsBoardLayoutProps) => (
  <div className="h-full">
    <div className="fixed inset-y-0 z-50 h-[80px] w-full md:pl-72">
      <Header />
    </div>
    <div className="fixed inset-y-0 z-50 hidden h-full w-72 flex-col md:flex">
      <Sidebar />
    </div>
    <main className="h-full md:pl-72">{children}</main>
  </div>
);

export default DahsBoardLayout;
