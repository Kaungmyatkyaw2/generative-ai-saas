'use client';

import { dataUrl, debounce, download, getImageSize } from '@/lib/utils';
import { Download, Loader } from 'lucide-react';
import { CldImage, getCldImageUrl } from 'next-cloudinary';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import React from 'react';

const TransformedImage = ({
    image,
    isTransforming,
    title,
    transformationConfig,
    type,
    hasDownload,
    setIsTransforming,
}: TransformedImageProps) => {
    const downloadHandler = () => {
        download(
            getCldImageUrl({
                width: image?.width,
                height: image?.height,
                src: image?.publicId,
                ...transformationConfig,
            }),
            title
        );
    };

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <h3 className='text-2xl font-bold text-slate-900'>Transformed</h3>
                {hasDownload && (
                    <button
                        className='flex items-center gap-4 text-sm text-gray-400'
                        onClick={downloadHandler}
                    >
                        <span>Download</span>
                        <Download className='size-5' />
                    </button>
                )}
            </div>
            {image?.publicId && transformationConfig ? (
                <div className='relative z-[-1]'>
                    <CldImage
                        src={image.publicId}
                        alt='selectedImage'
                        width={getImageSize(type, image, 'width')}
                        height={getImageSize(type, image, 'height')}
                        sizes='(max-width: 767px) 100vw, 50vw'
                        placeholder={dataUrl as PlaceholderValue}
                        onLoad={() => {
                            setIsTransforming && setIsTransforming(false);
                        }}
                        onError={() => {
                            debounce(() => {
                                setIsTransforming && setIsTransforming(false);
                            }, 8000)();
                        }}
                        {...transformationConfig}
                    />
                    {isTransforming ? (
                        <div className='absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-4 bg-black bg-opacity-60'>
                            <Loader className='size-8 animate-spin text-white' />
                            <h1 className='fonbt-bold text-neutral-100'>Please wait...</h1>
                        </div>
                    ) : null}
                </div>
            ) : (
                <div className='flex h-full min-h-72 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-[10px] border border-dashed bg-neutral-100 p-2 shadow-inner'>
                    <p>Transformed Image</p>
                </div>
            )}
        </div>
    );
};

export default TransformedImage;
