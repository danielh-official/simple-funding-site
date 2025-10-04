import { update } from '@/actions/App/Http/Controllers/Dashboard/FundingPageController';
import {
    Currency,
    Description,
    EndDate,
    GoalAmount,
    handleCheckboxValueChange,
    handleValueChange,
    Published,
    StartDate,
    Title,
} from '@/components/dashboard/funding-pages/form';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/dashboard/my-funding-pages';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FundingPage } from '@/types';

export default function Edit({ fundingPage }: { fundingPage: FundingPage }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'My Funding Pages', href: index().url },
        {
            title: fundingPage.title,
            href: edit(fundingPage.uuid).url,
        },
    ];

    const { errors } = usePage().props;

    function convertToIsoDate(dateString: string): string {
        return new Date(dateString).toISOString().split('T')[0];
    }

    // For now, use local state. Later, use Inertia form helpers.
    const [form, setForm] = useState({
        title: fundingPage.title || '',
        description: fundingPage.description || '',
        goal_amount: fundingPage.goal_amount || 0,
        currency: fundingPage.currency || 'USD',
        start_date: fundingPage.start_date
            ? convertToIsoDate(fundingPage.start_date)
            : '',
        end_date: fundingPage.end_date
            ? convertToIsoDate(fundingPage.end_date)
            : '',
        published: fundingPage.published_at ? true : false,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit: ${form.title}`} />
            <div className="mx-auto max-w-xl p-4">
                <h2 className="mb-6 text-xl font-bold text-[#f53003] dark:text-[#FF4433]">
                    Edit Funding Page
                </h2>
                <Form
                    action={update(fundingPage.uuid)}
                    className="flex flex-col gap-4"
                    transform={(data) => ({
                        ...data,
                        timezone:
                            Intl.DateTimeFormat().resolvedOptions().timeZone,
                        published: form.published,
                    })}
                >
                    <div>
                        <Title
                            value={form.title}
                            error={errors.title}
                            handleChange={(e) => handleValueChange(e, setForm)}
                        />
                    </div>
                    <div>
                        <Description
                            value={form.description}
                            error={errors.description}
                            handleChange={(e) => handleValueChange(e, setForm)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <GoalAmount
                            value={form.goal_amount}
                            error={errors.goal_amount}
                            handleChange={(e) => handleValueChange(e, setForm)}
                        />
                        <Currency
                            value={form.currency}
                            error={errors.currency}
                            handleChange={(e) => handleValueChange(e, setForm)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <StartDate
                            value={form.start_date}
                            error={errors.start_date}
                            handleChange={(e) => handleValueChange(e, setForm)}
                        />
                        <EndDate
                            value={form.end_date}
                            error={errors.end_date}
                            handleChange={(e) => handleValueChange(e, setForm)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <Published
                            value={form.published}
                            error={errors.published}
                            handleChange={(e) =>
                                handleCheckboxValueChange(e, setForm)
                            }
                        />
                        {/* Read only information for published date */}
                        {fundingPage.published_at && (
                            <div className="self-center text-sm text-gray-600 dark:text-gray-400">
                                Published on:{' '}
                                {new Date(
                                    fundingPage.published_at,
                                ).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="mt-4 cursor-pointer rounded bg-[#f53003] px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#d82a00] dark:bg-[#FF4433] dark:text-[#1C1C1A] dark:hover:bg-[#d82a00]"
                    >
                        Save Changes
                    </button>
                </Form>
            </div>
        </AppLayout>
    );
}
