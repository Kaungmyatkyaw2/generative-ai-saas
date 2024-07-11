'use client';

import { transformationObject } from '@/constants';
import { IImage } from '@/lib/database/models/image.model';
import { cn, formUrlQuery } from '@/lib/utils';
import { CldImage } from 'next-cloudinary';
import React from 'react';
import { Button } from '../ui/button';
import {
    Pagination,
    PaginationNext,
    PaginationPrevious,
} from '../ui/pagination';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const ImageCollection = ({
    images,
    pageCount,
    page,
}: {
    images: IImage[];
    pageCount: number;
    page: number;
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const onPageChange = (action: string) => {
        const pageValue = action === 'next' ? Number(page) + 1 : Number(page) - 1;

        const newUrl = formUrlQuery({
            searchParams: searchParams.toString(),
            key: 'page',
            value: pageValue,
        });

        router.push(newUrl, { scroll: false });
    };

    return (
        <>
            <div className='flex flex-wrap items-center gap-10'>
                {images.map((el: IImage) => (
                    <ImageCard key={el._id as string} image={el} />
                ))}
            </div>

            {pageCount > 1 && (
                <Pagination className='mt-10 w-full'>
                    <div className='flex flex-wrap w-full justify-center items-center gap-5'>
                        <Button disabled={page <= 1} onClick={() => onPageChange('prev')}>
                            <PaginationPrevious className='hover:bg-transparent hover:text-white' />
                        </Button>

                        <span className='p-16-medium w-fit flex-1'>
                            {page} / {pageCount}
                        </span>

                        <Button
                            className='bg-purple-gradient w-32 bg-cover text-white'
                            onClick={() => onPageChange('next')}
                            disabled={page >= pageCount}
                        >
                            <PaginationNext className='hover:bg-transparent hover:text-white' />
                        </Button>
                    </div>
                </Pagination>
            )}
        </>
    );
};

const ImageCard = ({ image }: { image: IImage }) => {
    const transformation =
        transformationObject[image.transformationType as TransformationTypeKey];
    return (
        <Link href={`/dashboard/my-images/${image._id}`} className='w-full space-y-3 rounded-lg p-2 shadow-sm sm:w-[220px]'>
            <CldImage
                src={image.publicId}
                alt={image.title}
                width={image.width}
                height={image.height}
                {...image.config}
                loading='lazy'
                className='h-52 w-full rounded-[10px] object-cover'
                sizes='(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw'
            />
            <div className='flex items-center justify-between'>
                <h3 className='text-lg font-bold text-gray-500 line-clamp-1 '>{image.title}</h3>
                <transformation.icon
                    className={cn('size-5', transformation.textColor)}
                />
            </div>
        </Link>
    );
};

export { ImageCollection };
