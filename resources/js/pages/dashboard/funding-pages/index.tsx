import AppLayout from '@/layouts/app-layout';
import { create, edit, index, show } from '@/routes/dashboard/my-funding-pages';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface FundingPage {
    uuid: string;
    title: string;
    description: string;
    currency: string;
    goal_amount?: number;
    current_amount: number;
    start_date: string;
    end_date: string;
    published_at?: {
        date: string;
        timezone_type: number;
        timezone: string;
    } | null;
    created_at: {
        date: string;
        timezone_type: number;
        timezone: string;
    };
    updated_at: {
        date: string;
        timezone_type: number;
        timezone: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Funding Pages',
        href: index().url,
    },
];

function convertToLocalDate(dateString?: string) {
    if (!dateString) return '';

    const date = new Date(dateString);

    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
}

export default function Index({
    fundingPages,
}: {
    fundingPages: FundingPage[];
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Funding Pages" />
            <div className="flex flex-col gap-8 p-4">
                <div className="flex items-center justify-between">
                    <Link
                        href={create().url}
                        className="inline-block rounded bg-[#f53003] px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#d82a00] dark:bg-[#FF4433] dark:hover:bg-[#d82a00]"
                    >
                        + Create New Funding Page
                    </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {fundingPages.map((page) => (
                        <div
                            key={page.uuid}
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
                                    {page.goal_amount?.toLocaleString()}
                                </span>
                            </div>
                            <div className="mb-2 flex items-center gap-2 text-sm">
                                <span className="font-medium">Raised:</span>
                                <span>
                                    {page.currency}{' '}
                                    {page.current_amount.toLocaleString()}
                                </span>
                            </div>
                            <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                                <span>
                                    {page.start_date} &ndash; {page.end_date}
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
                            <div className="mt-4 text-xs text-muted-foreground">
                                {page.published_at
                                    ? `Published on ${convertToLocalDate(page.published_at.date)}`
                                    : 'Not published yet'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
