import InputError from '@/components/input-error';

export function Title({
    value,
    error,
    handleChange,
}: {
    value: string;
    error: string | undefined;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <>
            <label className="mb-1 block text-sm font-medium" htmlFor="title">
                Title
            </label>
            <input
                id="title"
                name="title"
                type="text"
                value={value}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2 text-sm"
                required
            />
            {/* Show error message from request if title is invalid */}
            <InputError message={error} />
        </>
    );
}

export function Description({
    value,
    error,
    handleChange,
}: {
    value: string;
    error: string | undefined;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
    return (
        <>
            <label
                className="mb-1 block text-sm font-medium"
                htmlFor="description"
            >
                Description
            </label>
            <textarea
                id="description"
                name="description"
                value={value}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2 text-sm"
                rows={3}
            />
            {/* Show error message from request if description is invalid */}
            <InputError message={error} />
        </>
    );
}

export function GoalAmount({
    value,
    error,
    handleChange,
}: {
    value: number;
    error: string | undefined;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="flex-1">
            <label
                className="mb-1 block text-sm font-medium"
                htmlFor="goal_amount"
            >
                Goal Amount
            </label>
            <input
                id="goal_amount"
                name="goal_amount"
                type="number"
                value={value}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2 text-sm"
                min={0}
                required
            />
            {/* Show error message from request if goal_amount is invalid */}
            <InputError message={error} />
        </div>
    );
}

export function Currency({
    value,
    error,
    handleChange,
}: {
    value: string;
    error: string | undefined;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
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
                value={value}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2 text-sm"
                maxLength={3}
                required
            />
            {/* Show error message from request if currency is invalid */}
            <InputError message={error} />
        </div>
    );
}

export function StartDate({
    value,
    error,
    handleChange,
}: {
    value: string;
    error: string | undefined;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="flex-1">
            <label
                className="mb-1 block text-sm font-medium"
                htmlFor="start_date"
            >
                Start Date
            </label>
            <input
                id="start_date"
                name="start_date"
                type="date"
                value={value}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2 text-sm"
            />
            {/* Show error message from request if start_date is invalid */}
            <InputError message={error} />
        </div>
    );
}

export function EndDate({
    value,
    error,
    handleChange,
}: {
    value: string;
    error: string | undefined;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="flex-1">
            <label
                className="mb-1 block text-sm font-medium"
                htmlFor="end_date"
            >
                End Date
            </label>
            <input
                id="end_date"
                name="end_date"
                type="date"
                value={value}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2 text-sm"
            />
            {/* Show error message from request if end_date is invalid */}
            <InputError message={error} />
        </div>
    );
}

export function Published({
    value,
    error,
    setForm,
}: {
    value: boolean;
    error: string | undefined;
    // Ignore eslint warning about 'any' here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setForm: (prev: any) => void;
}) {
    return (
        <div className="flex-1">
            <label
                className="mb-1 block text-sm font-medium"
                htmlFor="published"
            >
                Published
            </label>
            <input
                id="published"
                name="published"
                type="checkbox"
                checked={value}
                onChange={(e) =>
                    // Ignore eslint warning about 'any' here
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setForm((prev: any) => ({
                        ...prev,
                        published: e.target.checked,
                    }))
                }
                className="h-5 w-5 rounded border text-[#f53003] focus:ring-[#f53003] dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-[#FF4433]"
            />
            {/* Show error message from request if published is invalid */}
            <InputError message={error} />
        </div>
    );
}
