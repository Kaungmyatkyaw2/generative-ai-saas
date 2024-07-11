import Image from 'next/image';
import Link from 'next/link';
import TransformedImage from '@/components/transformation/transformed-image';
import { Button } from '@/components/ui/button';
import { getImageById } from '@/lib/actions/image.actions';
import { cn, getImageSize } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import { transformationObject } from '@/constants';
import { DeleteConfirmation } from '@/components/transformation';

const ImageDetails = async ({ params: { id } }: SearchParamProps) => {
    const { userId } = auth();

    const image = await getImageById(id);

    const transformation = transformationObject[image.transformationType as TransformationTypeKey]

    return (
        <>
            <h1 className='text-4xl font-bold'>{image.title}</h1>

            <section className='mt-5 flex flex-wrap gap-4'>
                <div className='flex gap-2 font-medium'>
                    <p className='text-dark-600'>Transformation:</p>
                    <p className='capitalize text-neutral-400'>
                        {image.transformationType}
                    </p>
                </div>

                {image.prompt && (
                    <>
                        <p className='text-dark-400/50 hidden md:block'>&#x25CF;</p>
                        <div className='flex gap-2 font-medium'>
                            <p className='text-dark-600'>Prompt:</p>
                            <p className='capitalize text-neutral-400'>{image.prompt}</p>
                        </div>
                    </>
                )}

                {image.color && (
                    <>
                        <p className='text-dark-400/50 hidden md:block'>&#x25CF;</p>
                        <div className='flex gap-2 font-medium'>
                            <p className='text-dark-600'>Color:</p>
                            <p className='capitalize text-neutral-400'>{image.color}</p>
                        </div>
                    </>
                )}

                {image.aspectRatio && (
                    <>
                        <p className='text-dark-400/50 hidden md:block'>&#x25CF;</p>
                        <div className='medium flex gap-2 font-medium'>
                            <p className='text-dark-600'>Aspect Ratio:</p>
                            <p className='capitalize text-neutral-400'>{image.aspectRatio}</p>
                        </div>
                    </>
                )}
            </section>

            <section className='border-dark-400/15 border-t pt-10'>
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-2xl font-bold text-slate-900'>Original</h3>

                        <Image
                            width={getImageSize(image.transformationType, image, 'width')}
                            height={getImageSize(image.transformationType, image, 'height')}
                            src={image.secureUrl}
                            alt='image'
                            className='transformation-original_image'
                        />
                    </div>

                    <TransformedImage
                        image={image}
                        type={image.transformationType}
                        title={image.title}
                        isTransforming={false}
                        transformationConfig={image.config}
                        hasDownload={true}
                    />
                </div>

                {userId === image.author.clerkId && (
                    <div className='mt-4 space-y-4'>
                        <Button
                            asChild
                            type='button'
                            className={cn(
                                'w-full rounded-full py-6 hover:bg-opacity-80',
                                "bg-purple-600 hover:bg-purple-700"
                            )}
                        >
                            <Link href={`/dashboard/my-images/${image._id}/update`}>
                                Update Image
                            </Link>
                        </Button>

                        <DeleteConfirmation imageId={image._id} />
                    </div>
                )}
            </section>
        </>
    );
};

export default ImageDetails;
