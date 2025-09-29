import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

// For now, use static sample data. Later, load from props.
const sampleFundingPage = {
    id: 1,
    title: 'Help Build a Community Garden',
    description: 'Raising funds to create a green space for our neighborhood.',
    goalAmount: 2500,
    currentAmount: 1200,
    currency: 'USD',
    startDate: '2025-09-01',
    endDate: '2025-10-15',
    updates: [
        {
            id: 1,
            date: '2025-09-20',
            content:
                'We have reached 50% of our goal! Thank you for your support.',
        },
        {
            id: 2,
            date: '2025-09-25',
            content: 'Garden plans finalized. Construction starts next week.',
        },
    ],
    donations: [
        { id: 1, donor: 'Jane Doe', amount: 100, date: '2025-09-10' },
        { id: 2, donor: 'John Smith', amount: 200, date: '2025-09-12' },
    ],
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: sampleFundingPage.title, href: '#' },
];

export default function Show() {
    // In future, get funding page data from props via usePage<SharedData>().props
    const page = sampleFundingPage;

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
                                {page.goalAmount.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Raised</span>
                            <span>
                                {page.currency}{' '}
                                {page.currentAmount.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Dates</span>
                            <span>
                                {page.startDate} &ndash; {page.endDate}
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
                                key={update.id}
                                className="rounded bg-[#fff2f2] p-3 dark:bg-[#1D0002]"
                            >
                                <div className="mb-1 text-xs text-muted-foreground">
                                    {update.date}
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
                                key={donation.id}
                                className="flex items-center justify-between rounded bg-white p-3 shadow-sm dark:bg-[#161615]"
                            >
                                <span className="font-medium">
                                    {donation.donor}
                                </span>
                                <span>
                                    {page.currency}{' '}
                                    {donation.amount.toLocaleString()}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {donation.date}
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
