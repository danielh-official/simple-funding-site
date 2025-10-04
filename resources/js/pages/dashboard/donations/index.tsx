import { convertToLocalDateWithTime } from '@/app';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Pagination from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/dashboard/my-donations';
import { show } from '@/routes/dashboard/my-funding-pages';
import {
    BreadcrumbItem,
    FundingPageDonation,
    PaginatedResponse,
} from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Donations',
        href: index().url,
    },
];

export default function Index({
    donations: donations,
}: {
    donations: PaginatedResponse<FundingPageDonation>;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Donations" />

            <div className='text-sm text-muted-foreground p-4'>
                Donations you have made to funding pages.
            </div>

            {donations.total > 0 && (
                <div className="mt-4">
                    <Pagination
                        perPage={donations.per_page}
                        total={donations.total}
                        links={donations.links}
                    />
                </div>
            )}

            <div className="flex flex-col gap-8 p-4">
                {donations.data.map((donation) => (
                    <Card key={donation.uuid} className="mb-4 p-4">
                        <CardTitle className="mb-2 flex items-center justify-between">
                            <div>
                                {convertToLocalDateWithTime(
                                    donation.created_at,
                                )}
                            </div>
                        </CardTitle>
                        <CardHeader>
                            <div className="text-sm text-muted-foreground">
                                Donation for:{' '}
                                <a
                                    target="_blank"
                                    className="text-[#f53003] hover:underline"
                                    href={
                                        show(donation.funding_page?.uuid || '')
                                            .url
                                    }
                                >
                                    {donation.funding_page?.title ||
                                        'Unknown Funding Page'}
                                </a>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {donation.message ?? 'No message provided'}
                        </CardContent>
                    </Card>
                ))}
                {donations.total === 0 && (
                    <div className="text-center text-sm text-muted-foreground">
                        You have not made any donations yet.
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
