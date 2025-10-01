import { home } from '@/routes';
import { RouteDefinition } from '@/wayfinder';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
    homeLink?: RouteDefinition<'get'>;
}
function HomeLink(homeLink?: RouteDefinition<'get'>) {
    return (
        <>
            Return to{' '}
            <Link
                className="text-[#f53003] hover:underline"
                href={homeLink?.url ?? home()}
            >
                Home
            </Link>
        </>
    );
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
    homeLink,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
                <div
                    className={'mt-6 text-center text-sm text-muted-foreground'}
                >
                    {HomeLink(homeLink)}
                </div>
            </div>
        </div>
    );
}
