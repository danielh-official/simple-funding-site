import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { edit } from '@/routes/dashboard/index';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// Sample static funding page data
const sampleFundingPage = {
    uuid: 'sample-uuid-1',
    title: 'Help Build a Community Garden',
    description: 'Raising funds to create a green space for our neighborhood.',
    goalAmount: 2500,
    currentAmount: 1200,
    currency: 'USD',
    startDate: '2025-09-01',
    endDate: '2025-10-15',
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    {
        title: sampleFundingPage.title,
        href: edit(sampleFundingPage.uuid).url,
    },
];

export default function Edit() {
    // For now, use local state. Later, use Inertia form helpers.
    const [form, setForm] = useState({
        title: sampleFundingPage.title,
        description: sampleFundingPage.description,
        goalAmount: sampleFundingPage.goalAmount,
        currency: sampleFundingPage.currency,
        startDate: sampleFundingPage.startDate,
        endDate: sampleFundingPage.endDate,
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // TODO: Replace with Inertia form submission using Wayfinder action helper
        alert('Funding page updated (stub)');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit: ${form.title}`} />
            <div className="mx-auto max-w-xl p-4">
                <h2 className="mb-6 text-xl font-bold text-[#f53003] dark:text-[#FF4433]">
                    Edit Funding Page
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label
                            className="mb-1 block text-sm font-medium"
                            htmlFor="title"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2 text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label
                            className="mb-1 block text-sm font-medium"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2 text-sm"
                            rows={3}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label
                                className="mb-1 block text-sm font-medium"
                                htmlFor="goalAmount"
                            >
                                Goal Amount
                            </label>
                            <input
                                id="goalAmount"
                                name="goalAmount"
                                type="number"
                                value={form.goalAmount}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2 text-sm"
                                min={0}
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label
                                className="mb-1 block text-sm font-medium"
                                htmlFor="currency"
                            >
                                Currency
                            </label>
                            <input
                                id="currency"
                                name="currency"
                                type="text"
                                value={form.currency}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2 text-sm"
                                maxLength={3}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label
                                className="mb-1 block text-sm font-medium"
                                htmlFor="startDate"
                            >
                                Start Date
                            </label>
                            <input
                                id="startDate"
                                name="startDate"
                                type="date"
                                value={form.startDate}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label
                                className="mb-1 block text-sm font-medium"
                                htmlFor="endDate"
                            >
                                End Date
                            </label>
                            <input
                                id="endDate"
                                name="endDate"
                                type="date"
                                value={form.endDate}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2 text-sm"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 rounded bg-[#f53003] px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#d82a00] dark:bg-[#FF4433] dark:text-[#1C1C1A] dark:hover:bg-[#d82a00]"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
