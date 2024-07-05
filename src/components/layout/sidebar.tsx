'use client';

import { navLinksArray } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';



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
                    {navLinksArray.map((route) => (
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
                                <route.icon className={cn('mr-3 size-5', route.textColor)} />
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
