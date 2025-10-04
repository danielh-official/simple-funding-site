import { Link, router } from "@inertiajs/react";

interface PaginationProps {
    links: { 
        url: string | null; 
        label: string; 
        active: boolean;
        page: number | null;
    }[];
    perPage: number;
    total: number;
    perPageQueryParam?: string; // Optional custom query parameter name for items per page
}

export default function Pagination({ links, perPage, total, perPageQueryParam = 'per_page' }: PaginationProps) {
    return (
        <div className="flex items-center justify-center gap-4" >
            <div>
                <nav
                    className="flex gap-2 text-sm"
                    aria-label="Pagination"
                >
                    {links.map((link, index) =>
                        link?.url ? (
                            <Link
                                key={index}
                                href={`${link.url}&${perPageQueryParam}=${perPage}`}
                                className={
                                    link.active ? 'active' : ''
                                }
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        ) : (
                            <span />
                        ),
                    )}
                </nav>
            </div>

            {/* MARK: Number of items per pagec controls go here */}

            <div>
                <select
                    className="rounded border border-gray-300 p-2"
                    value={perPage}
                    onChange={(e) => {
                        // Handle changing items per page
                        const newPerPage = Number(e.target.value);
                        // Should be persisted in the url query parameters
                        const url = new URL(window.location.href);
                        url.searchParams.set(
                            perPageQueryParam,
                            newPerPage.toString(),
                        );
                        // Should trigger a re-fetch of the funding pages with the new per_page value
                        router.get(url.toString());
                    }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>

            {/* MARK: - Total number of items */}
            <div>
                <span className="text-sm text-muted-foreground">
                    {total}{' '}
                    {total === 1 ? 'item' : 'items'}
                </span>
            </div>
        </div >
    )
}