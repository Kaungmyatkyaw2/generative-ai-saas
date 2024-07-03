import Heading from '@/components/dashboard/heading';
import { Image } from 'lucide-react';
import React from 'react';

const ConversationPage = () => {
    return (
        <div className='px-4 lg:px-8'>
            <Heading
                title='Image Restoration'
                description='Restore your image with most advanced AI'
                icon={Image}
                iconColor='text-violet-500'
                bgColor='bg-violet-500/10'
            />
        </div>
    );
};

export default ConversationPage;
