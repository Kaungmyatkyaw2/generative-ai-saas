'use client';

import { navLinksArray } from '@/constants';
import { cn } from '@/lib/utils';
import { CircleUser, Coins, Projector } from 'lucide-react';
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
                <div className='flex h-[90%] w-full flex-col justify-between'>
                    <div className='space-y-2'>
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
                    <div className='space-y-2'>
                        <Link
                            href={'/dashboard/credits'}
                            className={cn(
                                'group flex w-full cursor-pointer rounded-lg p-3 text-sm font-medium transition hover:bg-orange-500/10 hover:text-orange-500',
                                pathname == '/dashboard/credits'
                                    ? 'bg-orange-500/10 text-orange-500'
                                    : 'text-orange-500'
                            )}
                        >
                            <div className='flex flex-1 items-center gap-2'>
                                <Coins className={cn('mr-3 size-5')} />
                                Buy Credits
                            </div>
                        </Link>

                        <Link
                            href={'/dashboard/my-images'}
                            className={cn(
                                'group flex w-full cursor-pointer rounded-lg p-3 text-sm font-medium transition hover:bg-white/10 hover:text-white',
                                pathname == '/dashboard/my-images'
                                    ? 'bg-white/10 text-white'
                                    : 'text-zinc-400'
                            )}
                        >
                            <div className='flex flex-1 items-center gap-2'>
                                <Projector className={cn('mr-3 size-5')} />
                                My Images
                            </div>
                        </Link>

                        <Link
                            href={'/dashboard/profile'}
                            className={cn(
                                'group flex w-full cursor-pointer rounded-lg p-3 text-sm font-medium transition hover:bg-sky-500/10 hover:text-sky-500',
                                pathname == '/dashboard/profile'
                                    ? 'bg-sky-500/10 text-sky-500'
                                    : 'text-sky-500'
                            )}
                        >
                            <div className='flex flex-1 items-center gap-2'>
                                <CircleUser className={cn('mr-3 size-5')} />
                                My Profile
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
