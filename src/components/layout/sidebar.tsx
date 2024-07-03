'use client';

import { cn } from '@/lib/utils';
import {
    Image,
    LayoutDashboard,
    Paintbrush,
    ScanLine,
    ScanText,
    Settings,
    Sparkles,
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
        label: 'Image Restore',
        icon: Image,
        href: '/image-restore',
        color: 'text-violet-500',
    },
    {
        label: 'Generative Fill',
        icon: Sparkles,
        href: '/generative-fill',
        color: 'text-pink-700',
    },
    {
        label: 'Remove Object',
        icon: ScanLine,
        href: '/remove-obj',
        color: 'text-orange-700',
    },
    {
        label: 'Object Recolor',
        icon: Paintbrush,
        href: '/recolor',
        color: 'text-emerald-500',
    },
    {
        label: 'Remove Background',
        icon: ScanText,
        href: '/remove-bg',
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
        <div className='flex h-full flex-col space-y-4 bg-black py-4 text-white'>
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
                            className={cn(
                                'group flex w-full cursor-pointer rounded-lg p-3 text-sm font-medium transition hover:bg-white/10 hover:text-white',
                                pathname == route.href
                                    ? 'bg-white/10 text-white'
                                    : 'text-zinc-400'
                            )}
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
