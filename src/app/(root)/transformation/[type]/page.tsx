import Heading from '@/components/dashboard/heading';
import { TransformationForm } from '@/components/transformation';
import { transformationObject } from '@/constants';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const TransformationPage = async ({ params }: { params: { type: string } }) => {
    const { userId } = auth();
    const transformation =
        transformationObject[params.type as TransformationTypeKey];

    if (!userId) {
        redirect('/signin');
    }

    const user = await getUserById(userId!);

    return (
        <div className='px-4 lg:px-8 space-y-10 pb-6'>
            <Heading
                title={transformation.label}
                description={transformation.description}
                icon={transformation.icon}
                iconColor={transformation.textColor}
                bgColor={transformation.bgColor}
            />
            <TransformationForm
                action='Add'
                userId={user._id as string}
                type={params.type as TransformationTypeKey}
                creditBalance={user.creditBalance!}
            />
        </div>
    );
};

export default TransformationPage;
