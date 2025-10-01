import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { RouteDefinition } from '@/wayfinder';

export default function AuthLayout({
    children,
    title,
    description,
    homeLink,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
    homeLink?: RouteDefinition<'get'>;
}) {
    return (
        <AuthLayoutTemplate
            title={title}
            description={description}
            homeLink={homeLink}
            {...props}
        >
            {children}
        </AuthLayoutTemplate>
    );
}
