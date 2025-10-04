import { destroy } from '@/actions/App/Http/Controllers/Dashboard/FundingPageUpdateController';
import { convertToLocalDateWithTime } from '@/app';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Pagination from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { show } from '@/routes/dashboard/my-funding-pages';
import { index } from '@/routes/dashboard/my-updates';
import { BreadcrumbItem, FundingPageUpdate, PaginatedResponse } from '@/types';
import { Form, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Funding Page Updates',
        href: index().url,
    },
];

export default function Index({
    fundingPageUpdates,
}: {
    fundingPageUpdates: PaginatedResponse<FundingPageUpdate>;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Updates" />

            <div className="mt-4">
                <Pagination
                    perPage={fundingPageUpdates.per_page}
                    total={fundingPageUpdates.total}
                    links={fundingPageUpdates.links}
                />
            </div>

            <div className="flex flex-col gap-8 p-4">
                {fundingPageUpdates.data.map((update) => (
                    <Card key={update.uuid} className="mb-4 p-4">
                        <CardTitle className="mb-2 flex items-center justify-between">
                            <div>
                                {update.title} &mdash;{' '}
                                {convertToLocalDateWithTime(update.created_at)}
                            </div>
                            <div>
                                <Form action={destroy(update.uuid)}>
                                    <Button
                                        type="submit"
                                        className="cursor-pointer"
                                        variant="destructive"
                                        onClick={(e) => {
                                            if (
                                                !confirm(
                                                    'Are you sure you want to delete this update? This action cannot be undone.',
                                                )
                                            ) {
                                                e.preventDefault();
                                            }
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Form>
                            </div>
                        </CardTitle>
                        <CardHeader>
                            <div className="text-sm text-muted-foreground">
                                Update for:{' '}
                                <a
                                    target="_blank"
                                    className="text-[#f53003] hover:underline"
                                    href={
                                        show(update.funding_page?.uuid || '')
                                            .url
                                    }
                                >
                                    {update.funding_page?.title ||
                                        'Unknown Funding Page'}
                                </a>
                            </div>
                        </CardHeader>
                        <CardContent>{update.content}</CardContent>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}
