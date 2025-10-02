import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/dashboard/my-funding-pages';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FundingPage } from '.';

export default function Show({ fundingPage }: { fundingPage: FundingPage }) {
    // In future, get funding page data from props via usePage<SharedData>().props
    const page = fundingPage;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'My Funding Pages', href: index().url },
        { title: fundingPage.title, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page.title} />
            <div className="flex flex-col gap-8 p-4">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-[#f53003] dark:text-[#FF4433]">
                        {page.title}
                    </h2>
                    <p className="text-base text-[#706f6c] dark:text-[#A1A09A]">
                        {page.description}
                    </p>
                    <div className="mt-2 flex gap-6">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Goal</span>
                            <span>
                                {page.currency}{' '}
                                {page.goal_amount?.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Raised</span>
                            <span>
                                {page.currency}{' '}
                                {page.current_amount?.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Dates</span>
                            <span>
                                {page.start_date} &ndash; {page.end_date}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                        Updates
                    </h3>
                    <ul className="flex flex-col gap-2">
                        {page.updates.map((update) => (
                            <li
                                key={update.uuid}
                                className="rounded bg-[#fff2f2] p-3 dark:bg-[#1D0002]"
                            >
                                <div className="mb-1 text-xs text-muted-foreground">
                                    {update.created_at}
                                </div>
                                <div className="text-sm">{update.content}</div>
                            </li>
                        ))}
                        {page.updates.length === 0 && (
                            <li className="text-sm text-muted-foreground">
                                No updates yet.
                            </li>
                        )}
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                        Recent Donations
                    </h3>
                    <ul className="flex flex-col gap-2">
                        {page.donations.map((donation) => (
                            <li
                                key={donation.uuid}
                                className="flex items-center justify-between rounded bg-white p-3 shadow-sm dark:bg-[#161615]"
                            >
                                <span className="font-medium">
                                    {donation.donor_name || 'Anonymous'}
                                </span>
                                <span>
                                    {page.currency}{' '}
                                    {donation.amount.toLocaleString()}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {donation.created_at}
                                </span>
                            </li>
                        ))}
                        {page.donations.length === 0 && (
                            <li className="text-sm text-muted-foreground">
                                No donations yet.
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}
