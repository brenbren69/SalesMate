import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, ShoppingBasket, ListOrdered, PhilippinePeso, SquareChartGantt, ChartNoAxesColumnIncreasing } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Product Management',
        url: '/productmanagement',
        icon: ShoppingBasket,
    },
    {
        title: 'Order & Tracking',
        url: '/order-tracking',
        icon: ListOrdered,
    },
    {
        title: 'Payment and Credit',
        url: '/payment-credit',
        icon: PhilippinePeso,
    },
    {
        title: 'Inventory',
        url: '/inventory',
        icon: SquareChartGantt,
    },
    {
        title: 'Sales Monitoring',
        url: '/sales-monitoring',
        icon: ChartNoAxesColumnIncreasing,
    },
    {
        title: 'Report Generation',
        url: '/report-generation',
        icon: LayoutGrid,
    },
    {
        title: 'Scheduling',
        url: '/scheduling',
        icon: LayoutGrid,
    },
    {
        title: 'Account Management',
        url: '/account-management',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    // Removed Repository and Documentation items
    // {
    //     title: 'Repository',
    //     url: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     url: 'https://laravel.com/docs/starter-kits',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}