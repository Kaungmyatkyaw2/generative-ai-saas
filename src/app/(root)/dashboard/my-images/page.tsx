import {
    ImageCollection,
    SearchImagesInput,
} from '@/components/transformation';
import { getMyImages } from '@/lib/actions/image.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

const MyImagesPage = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchQuery = searchParams?.query || '';

    const { userId } = auth();
    const user = await getUserById(userId!);

    const images = await getMyImages({
        page,
        userId: user._id,
        search: searchQuery,
    });

    return (
        <section className='space-y-10 px-4 pb-6 lg:px-8'>
            {' '}
            <div className='flex flex-wrap items-center justify-between gap-3 md:gap-0'>
                <h1 className='text-2xl font-bold lg:text-3xl'>My Images</h1>
                <SearchImagesInput />
            </div>
            <ImageCollection
                images={images.data}
                page={page}
                pageCount={Number(images.pageCount)}
            />
        </section>
    );
};

export default MyImagesPage;
