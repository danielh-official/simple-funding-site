import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/dashboard/my-funding-pages';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

// Local InputError component
function InputError({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <div className="mt-1 text-xs text-red-600 dark:text-red-400">
            {message}
        </div>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'My Funding Pages', href: index().url },
    { title: 'Create Funding Page', href: create().url },
];

export default function Create() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        goalAmount: '',
        currency: '',
        startDate: '',
        endDate: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [processing, setProcessing] = useState(false);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setProcessing(true);

        // Simple static validation
        const newErrors: { [key: string]: string } = {};
        if (!form.title) newErrors.title = 'Title is required.';
        if (!form.goalAmount || Number(form.goalAmount) <= 0)
            newErrors.goalAmount = 'Goal amount must be greater than 0.';
        if (!form.currency) newErrors.currency = 'Currency is required.';

        setErrors(newErrors);
        setProcessing(false);

        if (Object.keys(newErrors).length === 0) {
            alert('Funding page created (stub)');
            setForm({
                title: '',
                description: '',
                goalAmount: '',
                currency: '',
                startDate: '',
                endDate: '',
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Funding Page" />
            <div className="mx-auto max-w-xl p-4">
                <h2 className="mb-6 text-xl font-bold text-[#f53003] dark:text-[#FF4433]">
                    Create Funding Page
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
                        <InputError message={errors.title} />
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
                        <InputError message={errors.description} />
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
                            <InputError message={errors.goalAmount} />
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
                            <InputError message={errors.currency} />
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
                            <InputError message={errors.startDate} />
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
                            <InputError message={errors.endDate} />
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
                            className="mt-4 rounded bg-[#f53003] px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#d82a00] disabled:opacity-60 dark:bg-[#FF4433] dark:text-[#1C1C1A] dark:hover:bg-[#d82a00]"
                        >
                            Create Funding Page
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
