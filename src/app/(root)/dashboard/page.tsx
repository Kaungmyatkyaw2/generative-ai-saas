import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { tools } from '@/constants';

const DashboardPage = () => {
    return (
        <div className='px-4 md:px-20 lg:px-32'>
            <div className='mb-8 space-y-4'>
                <h1 className='text-center text-2xl font-bold md:text-4xl'>
                    Explore the power of AI
                </h1>
                <p className='text-center text-sm font-light text-muted-foreground md:text-lg'>
                    Chat with smartest AI - Expereince the power of AI
                </p>
            </div>
            <div className='space-y-4 pb-4'>
                {tools.map((tool) => (
                    <Link
                        href={tool.href}
                        key={tool.href}
                        className='flex w-full cursor-pointer items-center justify-between rounded-lg border p-3 shadow-sm transition hover:shadow-md'
                    >
                        <div className='flex items-center gap-4'>
                            <div className={cn('w-fit rounded-md p-2 bg-opacity-10', tool?.bgColor)}>
                                <tool.icon className={cn('size-5', tool.textColor)} />
                            </div>
                            <h3 className='font-semibold'>{tool.label}</h3>
                        </div>
                        <ArrowRight className='size-5' />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;
