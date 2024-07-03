import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface HeadingProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
}

const Heading = ({
    title,
    description,
    icon: Icon,
    iconColor,
    bgColor,
}: HeadingProps) => {
    return (
        <>
            <div className='mb-8 flex flex-wrap items-center gap-5'>
                <div className={cn('w-fit rounded-md p-2', bgColor)}>
                    <Icon className={cn('h-8 w-8', iconColor)} />
                </div>
                <div className='space-y-2'>
                    <h2 className='text-3xl font-bold'>{title}</h2>
                    <p className='text-muted-foreground text-sm'>{description}</p>
                </div>
            </div>
        </>
    );
};

export default Heading;
