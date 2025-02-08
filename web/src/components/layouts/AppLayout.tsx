import * as React from 'react';
import { SidebarProvider } from '../ui/Sidebar';
import Header from './Header';
import { AppSidebar } from './AppSidebar';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex">
          <AppSidebar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
