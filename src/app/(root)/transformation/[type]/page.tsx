import Heading from '@/components/dashboard/heading';
import { TransformationObjectKeys, trasnformationsObject } from '@/constants';
import React from 'react';

const ConversationPage = ({ params }: { params: { type: string } }) => {
    const transformation =
        trasnformationsObject[params.type as TransformationObjectKeys];

    return (
        <div className='px-4 lg:px-8'>
            <Heading
                title={transformation.label}
                description={transformation.description}
                icon={transformation.icon}
                iconColor={transformation.textColor}
                bgColor={transformation.bgColor}
            />
        </div>
    );
};

export default ConversationPage;
