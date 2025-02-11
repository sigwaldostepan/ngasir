import {
  Box,
  ChevronDown,
  CreditCard,
  List,
  PlusCircle,
  Users,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from '../ui/Sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/Collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const items = [
  {
    label: 'Transaksi',
    icon: CreditCard,
    menus: [
      { title: 'Lihat Transaksi', href: '/transactions', icon: List },
      { title: 'Buat Transaksi', href: '/transactions/new', icon: PlusCircle },
    ],
  },
  {
    label: 'Customer',
    icon: Users,
    menus: [{ title: 'Lihat Customer', href: '/customers', icon: List }],
  },
  {
    label: 'Produk',
    icon: Box,
    menus: [
      { title: 'Lihat Produk', href: '/products', icon: List },
      { title: 'Tambah Produk', href: '/products/new', icon: PlusCircle },
    ],
  },
];

export const AppSidebar = () => {
  const isMobile = useIsMobile();

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      {isMobile && (
        <>
          <SidebarHeader className="font-bold text-2xl">
            <h2>
              Ngasir
              <span className="text-purple-500">.Lur</span>
            </h2>
          </SidebarHeader>
          <SidebarSeparator className="my-3" />
        </>
      )}
      <SidebarContent className={cn(!isMobile && 'p-6 pt-20')}>
        <SidebarMenu>
          {items.map((item, i) => {
            return (
              <Collapsible key={i} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="font-semibold w-full flex justify-between items-center">
                      <span className="flex items-center">
                        <item.icon className="mr-2 h-6 w-6" />
                        {item.label}
                      </span>
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {item.menus.map((menu, i) => {
                      return (
                        <SidebarMenuSub key={i}>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild>
                              <a href={menu.href}>
                                <menu.icon />
                                <span>{menu.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      );
                    })}
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};
