'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

export const SearchImagesInput = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState('');


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query) {
                const newUrl = formUrlQuery({
                    searchParams: searchParams.toString(),
                    key: "query",
                    value: query,
                });

                router.push(newUrl, { scroll: false });
            } else {
                const newUrl = removeKeysFromQuery({
                    searchParams: searchParams.toString(),
                    keysToRemove: ["query"],
                });

                router.push(newUrl, { scroll: false });
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchParams, query]);


    return (
        <div className='relative flex items-center justify-between space-x-4 rounded-md border px-4 py-1 md:w-fit w-full'>
            <SearchIcon className='size-5' />
            <Input
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search your images by title...'
                className='rounded-none border-none p-0 outline-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-0'
            />
        </div>
    );
};
