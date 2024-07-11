import { redirect } from 'next/navigation';

import { plans } from '@/constants';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { PricingCard } from '@/components/pricing/pricing-card';

const Credits = async () => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    const user = await getUserById(userId);

    return (
        <>
            <div className='mb-8 space-y-2'>
                <h2 className='text-3xl font-bold'>Buy Credit</h2>
                <p className='text-sm text-muted-foreground'>
                    Choose a credit package that suits your needs!
                </p>
            </div>
            <section className='flex lg:flex-row flex-col justify-between gap-5'>
                {plans.map((plan, index) => (
                    <PricingCard
                        key={index}
                        buttonText='Buy'
                        credits={plan.credits}
                        inclusions={plan.inclusions}
                        name={plan.name}
                        price={plan.price}
                        userId={user._id}
                    />
                ))}
            </section>
        </>
    );
};

export default Credits;
