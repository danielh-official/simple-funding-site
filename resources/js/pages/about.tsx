import StaticLayout from '@/layouts/static-layout';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <>
            <Head title="About">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <StaticLayout>
                    <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                        <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                            <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                <h1 className="mb-2 text-2xl font-bold tracking-tight text-[#1b1b18] dark:text-[#EDEDEC]">
                                    About Simple Funding
                                </h1>
                                <p className="mb-4 text-base text-[#706f6c] dark:text-[#A1A09A]">
                                    Simple Funding is dedicated to making
                                    fundraising effortless for everyone. Our
                                    platform empowers individuals and
                                    organizations to launch funding pages,
                                    accept donations securely, and keep
                                    supporters engaged with updates.
                                </p>
                                <ul className="mb-6 flex flex-col gap-2">
                                    <li className="flex items-center gap-2">
                                        <span className="inline-block h-3 w-3 rounded-full bg-[#f53003] dark:bg-[#FF4433]" />
                                        <span>
                                            Trusted by hundreds of campaigns
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="inline-block h-3 w-3 rounded-full bg-[#f53003] dark:bg-[#FF4433]" />
                                        <span>
                                            Transparent fees & instant setup
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="inline-block h-3 w-3 rounded-full bg-[#f53003] dark:bg-[#FF4433]" />
                                        <span>
                                            Support for CSV export and secure
                                            payments
                                        </span>
                                    </li>
                                </ul>
                                <div className="flex gap-3">
                                    <a
                                        href="/register"
                                        className="inline-block rounded-sm border border-[#f53003] bg-[#f53003] px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#d82a00] dark:border-[#FF4433] dark:bg-[#FF4433] dark:text-[#1C1C1A] dark:hover:bg-[#d82a00]"
                                    >
                                        Get Started Free
                                    </a>
                                    <a
                                        href="/"
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-2 text-sm font-semibold text-[#1b1b18] transition hover:border-[#1915014a] hover:text-[#f53003] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:text-[#FF4433]"
                                    >
                                        Back to Home
                                    </a>
                                </div>
                            </div>
                        </main>
                    </div>
                    <div className="hidden h-14.5 lg:block"></div>
                </StaticLayout>
            </div>
        </>
    );
}
