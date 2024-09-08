type DahsBoardLayoutProps = {
  children: React.ReactNode;
};
const DahsBoardLayout = ({ children }: DahsBoardLayoutProps) => (
  <div className="h-full">{children}</div>
);

export default DahsBoardLayout;
