import Heading from '@/components/dashboard/heading';
import { TransformationForm } from '@/components/transformation';
import { transformationObject } from '@/constants';
import { getImageById } from '@/lib/actions/image.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

const UpdateImagePage = async ({ params }: { params: { id: string } }) => {

    const { userId } = auth();
    const user = await getUserById(userId!);

    const image = await getImageById(params.id)

    const transformation =
        transformationObject[image?.transformationType as TransformationTypeKey];

    return (
        <div>
            <Heading
                title={transformation.label}
                description={transformation.description}
                icon={transformation.icon}
                iconColor={transformation.textColor}
                bgColor={transformation.bgColor}
            />
            <TransformationForm
                action='Update'
                userId={user._id}
                type={image.transformationType as TransformationTypeKey}
                creditBalance={user.creditBalance!}
                data={image}
                config={image.config}
            />
        </div>
    );
};

export default UpdateImagePage;
