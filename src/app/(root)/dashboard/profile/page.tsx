import Image from 'next/image';
import { ImageCollection } from '@/components/transformation';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { getMyImages } from '@/lib/actions/image.actions';
import { Coins, Images } from 'lucide-react';

const Profile = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const { userId } = auth();

    const user = await getUserById(userId!);
    const images = await getMyImages({ page, userId: user._id });

    return (
        <>
            <section className='space-y-3'>
                <h3 className='text-2xl font-bold'>Profile</h3>
                <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
                    <div className='w-full rounded-md border p-6 shadow-sm'>
                        <p className='text-md font-semibold text-neutral-400'>
                            CREDITS AVAILABLE
                        </p>
                        <div className='mt-4 flex items-center gap-4'>
                            <Coins className='size-8 text-orange-500' />
                            <h2 className='text-3xl font-bold text-black'>
                                {user.creditBalance}
                            </h2>
                        </div>
                    </div>

                    <div className='w-full rounded-md border p-6 shadow-sm'>
                        <p className='text-md font-semibold text-neutral-400'>
                            IMAGE MANIPULATION DONE
                        </p>
                        <div className='mt-4 flex items-center gap-4'>
                            <Images className='size-8 text-blue-700' />
                            <h2 className='text-3xl font-bold text-black'>
                                {images?.data.length}
                            </h2>
                        </div>
                    </div>
                </div>
            </section>

            <section className='mt-8 space-y-3 md:mt-14'>
                <h3 className='text-2xl font-bold'>Recent Edits</h3>
                <ImageCollection
                    images={images?.data}
                    pageCount={images?.pageCount}
                    page={page}
                />
            </section>
        </>
    );
};

export default Profile;
