import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { home } from '@/routes';
import { index as myDonations } from '@/routes/dashboard/my-donations';
import { index } from '@/routes/dashboard/my-funding-pages';
import { index as myUpdates } from '@/routes/dashboard/my-updates';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    ArrowBigLeftIcon,
    ArrowUpCircle,
    CircleDollarSign,
    LayoutGrid,
} from 'lucide-react';
import AppLogo from './app-logo';
import { NavFooter } from './nav-footer';

const mainNavItems: NavItem[] = [
    {
        title: 'My Funding Pages',
        href: index(),
        icon: LayoutGrid,
    },
    // TODO: Finish initial setup on these pages
    {
        title: 'My Updates',
        href: myUpdates(),
        icon: ArrowUpCircle,
    },
    {
        title: 'My Donations',
        href: myDonations(),
        icon: CircleDollarSign,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Return to Site',
        href: home().url,
        // Should be a back arrow icon
        icon: ArrowBigLeftIcon,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={index()} prefetch>
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
