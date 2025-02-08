import { SidebarTrigger } from '../ui/Sidebar';

const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full h-16 z-50 p-4 md:p-6 bg-background border-b shadow-lg">
      <div className="w-full h-full flex items-center justify-start">
        <div className="flex items-center justify-center gap-x-3">
          <SidebarTrigger />
          <h1 className="font-bold text-2xl pl-3 border-l">
            Ngasir
            <span className="text-purple-500">.Lur</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
