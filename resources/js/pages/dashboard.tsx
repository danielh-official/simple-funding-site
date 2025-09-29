import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { edit, show } from '@/routes/dashboard/index';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// Sample static funding pages
const sampleFundingPages = [
    {
        id: 1,
        uuid: 'sample-uuid-1',
        title: 'Help Build a Community Garden',
        description:
            'Raising funds to create a green space for our neighborhood.',
        goalAmount: 2500,
        currentAmount: 1200,
        currency: 'USD',
        startDate: '2025-09-01',
        endDate: '2025-10-15',
    },
    {
        id: 2,
        uuid: 'sample-uuid-2',
        title: 'Support Local Animal Shelter',
        description:
            'Every dollar helps provide food and care for rescued pets.',
        goalAmount: 5000,
        currentAmount: 3400,
        currency: 'USD',
        startDate: '2025-08-20',
        endDate: '2025-12-01',
    },
    {
        id: 3,
        uuid: 'sample-uuid-3',
        title: 'School Supplies for Kids',
        description:
            'Join us in making sure every child starts the year prepared.',
        goalAmount: 1500,
        currentAmount: 900,
        currency: 'USD',
        startDate: '2025-09-10',
        endDate: '2025-10-05',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-8 p-4">
                <h2 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                    Your Funding Pages
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {sampleFundingPages.map((page) => (
                        <div
                            key={page.id}
                            className="flex flex-col rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-[#161615]"
                        >
                            <h3 className="mb-2 text-lg font-bold text-[#f53003] dark:text-[#FF4433]">
                                {page.title}
                            </h3>
                            <p className="mb-3 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                {page.description}
                            </p>
                            <div className="mb-2 flex items-center gap-2 text-sm">
                                <span className="font-medium">Goal:</span>
                                <span>
                                    {page.currency}{' '}
                                    {page.goalAmount.toLocaleString()}
                                </span>
                            </div>
                            <div className="mb-2 flex items-center gap-2 text-sm">
                                <span className="font-medium">Raised:</span>
                                <span>
                                    {page.currency}{' '}
                                    {page.currentAmount.toLocaleString()}
                                </span>
                            </div>
                            <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                                <span>
                                    {page.startDate} &ndash; {page.endDate}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href={show(page.uuid).url}
                                    className="inline-block rounded border border-[#f53003] px-4 py-1 text-sm font-semibold text-[#f53003] transition hover:bg-[#f53003] hover:text-white dark:border-[#FF4433] dark:text-[#FF4433] dark:hover:bg-[#FF4433] dark:hover:text-[#1C1C1A]"
                                >
                                    View Details
                                </Link>
                                <Link
                                    href={edit(page.uuid).url}
                                    className="inline-block rounded border border-[#19140035] px-4 py-1 text-sm font-semibold text-[#1b1b18] transition hover:border-[#1915014a] hover:text-[#f53003] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:text-[#FF4433]"
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
