import { about, dashboard, home, login, pricing, register } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { RouteDefinition } from '@/wayfinder';
import { Link, usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface StaticLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

/**
 * A component for the navigation link
 *
 * The link should be styled differently based on whether the user is on the page or not.
 */
function NavLink({
    href,
    children,
}: {
    href: RouteDefinition<'get'>;
    children: ReactNode;
}) {
    const isActive = usePage().url === href.url;

    return (
        <Link
            className={[
                'inline-block rounded-sm border px-5 py-1.5 text-sm leading-normal transition',
                'border-[#19140035] text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]',
                isActive
                    ? 'border-[#f53003] font-bold text-[#f53003] dark:border-[#FF4433] dark:text-[#FF4433]'
                    : '',
            ].join(' ')}
            href={href}
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </Link>
    );
}

export default function StaticLayout({
    children,
}: StaticLayoutProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
            <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                {/* MARK: - Navigation */}
                <nav className="flex items-center justify-end gap-4">
                    {/* MARK: - Links to pages that are always available regardless of whether user is guest or authenticated */}
                    <NavLink href={home()}>Home</NavLink>
                    <NavLink href={about()}>About</NavLink>
                    <NavLink href={pricing()}>Pricing</NavLink>
                    {/* MARK: - If user is authenticated, show dashboard, otherwise login and register */}
                    {auth.user ? (
                        <>
                            <NavLink href={dashboard()}>Dashboard</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink href={login()}>Log in</NavLink>
                            <NavLink href={register()}>Register</NavLink>
                        </>
                    )}
                </nav>
            </header>
            {children}
        </div>
    );
}
