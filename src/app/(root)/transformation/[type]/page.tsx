import Heading from '@/components/dashboard/heading';
import { TransformationForm } from '@/components/transformation';
import { transformationObject } from '@/constants';
import { getUserById } from '@/lib/actions/user.actions';
import { getIcon } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

const TransformationPage = async ({ params }: { params: { type: string } }) => {
    const transformation =
        transformationObject[params.type as TransformationTypeKey];
    const { userId } = auth();
    const user = await getUserById(userId!);

    return (
        <div>
            <Heading
                title={transformation.label}
                description={transformation.description}
                icon={getIcon(transformation.key)}
                iconColor={transformation.textColor}
                bgColor={transformation.bgColor}
            />
            <TransformationForm
                action='Add'
                userId={user._id}
                type={params.type as TransformationTypeKey}
                creditBalance={user.creditBalance!}
            />
        </div>
    );
};

export default TransformationPage;
