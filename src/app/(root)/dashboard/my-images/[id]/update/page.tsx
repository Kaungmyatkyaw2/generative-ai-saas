import Heading from '@/components/dashboard/heading';
import { TransformationForm } from '@/components/transformation';
import { transformationObject } from '@/constants';
import { getImageById } from '@/lib/actions/image.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import {
    Image,
    LucideIcon,
    Paintbrush,
    ScanLine,
    ScanText,
    Sparkles,
    LayoutDashboard,
} from 'lucide-react';

const UpdateImagePage = async ({ params }: { params: { id: string } }) => {
    const { userId } = auth();
    const user = await getUserById(userId!);

    const image = await getImageById(params.id);

    const transformation =
        transformationObject[image?.transformationType as TransformationTypeKey];

    const icons: { [key: string]: LucideIcon } = {
        fill: Sparkles,
        recolor: Paintbrush,
        removeBackground: ScanText,
        remove: ScanLine,
        restore: Image,
        dashboard: LayoutDashboard,
    };

    return (
        <div>
            <Heading
                title={transformation.label}
                description={transformation.description}
                icon={icons[transformation.key]}
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
