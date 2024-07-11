'use client';

import React, { SetStateAction } from 'react';
import { useToast } from '../ui/use-toast';
import {
    CldImage,
    CldUploadWidget,
    CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { IImage } from '@/lib/database/models/image.model';
import { Plus } from 'lucide-react';
import { cn, dataUrl, getImageSize } from '@/lib/utils';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';

interface Props {
    onValueChange: (value: string) => any;
    setImage: React.Dispatch<SetStateAction<IImage | null>>;
    image: IImage | null;
    publicId?: string;
    type: string;
    iconColor?: string;
}

const MediaUploader = ({
    publicId,
    type,
    image,
    setImage,
    onValueChange,
    iconColor,
}: Props) => {
    const { toast } = useToast();

    function handleUploadSuccess(result: any) {
        setImage((prev: any) => ({
            ...prev,
            publicId: result?.info?.public_id,
            width: result?.info?.width,
            height: result?.info?.height,
            secureUrl: result?.info?.secure_url,
        }));

        onValueChange(result?.info?.public_id);

        toast({
            title: 'Image uploaded successfully.',
            description: '1 credit was deducted from your account',
            duration: 5000,
        });
    }

    function handleUploadError() {
        toast({
            title: 'Something went wrong while uploading.',
            description: 'Please try again',
            duration: 5000,
            variant: 'destructive',
        });
    }

    return (
        <CldUploadWidget
            uploadPreset='jsm_mrbrain'
            options={{
                multiple: false,
                resourceType: 'image',
            }}
            onSuccess={handleUploadSuccess}
            onError={handleUploadError}
        >
            {({ open }) => (
                <div className='flex flex-col gap-4'>
                    <h3 className='text-2xl font-bold text-slate-900'>Original</h3>
                    {publicId ? (
                        <div className='cursor-pointer overflow-hidden rounded-[10px]'>
                            <CldImage
                                src={publicId}
                                alt='selectedImage'
                                width={getImageSize(type, image, 'width')}
                                height={getImageSize(type, image, 'height')}
                                sizes='(max-width: 767px) 100vw, 50vw'
                                placeholder={dataUrl as PlaceholderValue}
                            />
                        </div>
                    ) : (
                        <div
                            onClick={() => open()}
                            className='flex h-fit min-h-72 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-[10px] border border-dashed bg-neutral-100 p-2 shadow-inner'
                        >
                            <div className='rounded-[10px] bg-white p-2 shadow'>
                                <Plus className={cn("size-10 text-purple-500", iconColor)} />
                            </div>
                            <p className='text-sm text-muted-foreground'>
                                Click here to upload image
                            </p>
                        </div>
                    )}
                </div>
            )}
        </CldUploadWidget>
    );
};

export default MediaUploader;
