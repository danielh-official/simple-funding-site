import { update } from '@/actions/App/Http/Controllers/FundingPageController';
import {
    Currency,
    Description,
    EndDate,
    GoalAmount,
    Published,
    StartDate,
    Title,
} from '@/components/dashboard/funding-pages/form';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/dashboard/my-funding-pages';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FundingPage } from '.';

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

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

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
                    })}
                >
                    <div>
                        <Title
                            value={form.title}
                            error={errors.title}
                            handleChange={handleChange}
                        />
                    </div>
                    <div>
                        <Description
                            value={form.description}
                            error={errors.description}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-4">
                        <GoalAmount
                            value={form.goal_amount}
                            error={errors.goal_amount}
                            handleChange={handleChange}
                        />
                        <Currency
                            value={form.currency}
                            error={errors.currency}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-4">
                        <StartDate
                            value={form.start_date}
                            error={errors.start_date}
                            handleChange={handleChange}
                        />
                        <EndDate
                            value={form.end_date}
                            error={errors.end_date}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-4">
                        <Published
                            value={form.published}
                            error={errors.published}
                            setForm={setForm}
                        />
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
