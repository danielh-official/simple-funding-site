import { store } from '@/actions/App/Http/Controllers/Dashboard/FundingPageController';
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
import { create, index } from '@/routes/dashboard/my-funding-pages';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'My Funding Pages', href: index().url },
    { title: 'Create Funding Page', href: create().url },
];

export default function Create() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        goal_amount: 0,
        currency: '',
        start_date: '',
        end_date: '',
        published: false,
    });

    const { errors } = usePage().props;
    const [processing] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Funding Page" />
            <div className="mx-auto max-w-xl p-4">
                <h2 className="mb-6 text-xl font-bold text-[#f53003] dark:text-[#FF4433]">
                    Create Funding Page
                </h2>
                <Form
                    action={store()}
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
                        <div className="flex-1">
                            <Published
                                value={form.published}
                                error={errors.published}
                                handleChange={(e) =>
                                    handleCheckboxValueChange(e, setForm)
                                }
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <Link
                            href={index().url}
                            className="rounded px-4 py-2 text-sm font-semibold text-[#706f6c] hover:underline dark:text-[#A1A09A]"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-4 cursor-pointer rounded bg-[#f53003] px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#d82a00] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#FF4433] dark:text-[#1C1C1A] dark:hover:bg-[#d82a00]"
                        >
                            Create Funding Page
                        </button>
                    </div>
                </Form>
            </div>
        </AppLayout>
    );
}
