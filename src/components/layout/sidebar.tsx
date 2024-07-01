'use client';

import { cn } from '@/lib/utils';
import {
    Code,
    Image,
    LayoutDashboard,
    MessageSquare,
    Music,
    Settings,
    Video,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500',
    },
    {
        label: 'Conversatoin',
        icon: MessageSquare,
        href: '/conversation',
        color: 'text-violet-500',
    },
    {
        label: 'Image Generation',
        icon: Image,
        href: '/image',
        color: 'text-pink-700',
    },
    {
        label: 'Video Generation',
        icon: Video,
        href: '/video',
        color: 'text-orange-700',
    },
    {
        label: 'Music Generation',
        icon: Music,
        href: '/music',
        color: 'text-emerlad-500',
    },
    {
        label: 'Code Generation',
        icon: Code,
        href: '/code',
        color: 'text-green-700',
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/settings',
    },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className='flex h-full flex-col space-y-4 bg-[#111827] py-4 text-white'>
            <div className='flex-1 px-3 py-2'>
                <Link
                    href={'/dashboard'}
                    className='tex-xl mb-10 flex items-center pl-3 font-bold'
                >
                    Mr Brain
                </Link>
                <div className='w-full space-y-2'>
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={
                                cn("group flex w-full cursor-pointer rounded-lg p-3 text-sm font-medium transition hover:bg-white/10 hover:text-white",
                                    pathname == route.href ? "text-white bg-white/10" : "text-zinc-400  "
                                )
                            }
                        >
                            <div className='flex flex-1 items-center gap-2'>
                                <route.icon className={cn('mr-3 size-5', route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
