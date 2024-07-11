import React from 'react';
import {
    Card as UICard,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import Checkout from './checkout';

interface PricingCardProps {
    name: string;
    price: number;
    inclusions: { label: string; isIncluded: boolean }[];
    buttonText: string;
    userId: string;
    credits: number;
}

export const PricingCard: React.FC<PricingCardProps> = ({
    name,
    price,
    inclusions,
    buttonText,
    userId,
    credits,
}) => {
    return (
        <UICard className='rounded-lg bg-background p-6 px-3 shadow-lg w-full'>
            <CardHeader>
                <CardTitle className='text-2xl font-bold'>{name}</CardTitle>
                <CardDescription className='text-muted-foreground'>
                    Buy Now
                </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                <div className='text-4xl font-bold'>{price}$</div>
                <div className='space-y-2'>
                    {inclusions.map((inclusion, index) => (
                        <div key={index} className='flex items-center gap-2'>
                            {inclusion.isIncluded ? (
                                <Check className='h-5 w-5 text-primary' />
                            ) : (
                                <X className='size-5 text-red-500' />
                            )}
                            <span>{inclusion.label}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                {name == 'Free' ? (
                    <Button variant='outline' className='w-full'>
                        Free Consumable
                    </Button>
                ) : (
                    <Checkout
                        amount={price}
                        buyerId={userId}
                        credits={credits}
                        plan={name}
                    />
                )}
            </CardFooter>
        </UICard>
    );
};
