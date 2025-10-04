import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface FundingPageUpdate {
    uuid: string;
    title: string;
    content: string;
    created_at?: string;
    funding_page?: FundingPage;
}

export interface FundingPageDonation {
    uuid: string;
    amount: number;
    donor_name?: string;
    donor_email: string;
    message?: string;
    created_at?: string;
    funding_page?: FundingPage;
}

export interface FundingPage {
    uuid: string;
    title: string;
    description: string;
    currency: string;
    goal_amount?: number;
    current_amount: number;
    start_date?: string;
    end_date?: string;
    published_at?: string;
    created_at?: string;
    updated_at?: string;
    updates: FundingPageUpdate[];
    donations: FundingPageDonation[];
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
        page: number | null;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
