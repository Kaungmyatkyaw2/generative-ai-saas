import React from 'react';
import { useToast } from '../ui/use-toast';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { IImage } from '@/lib/database/models/image.model';
import { Plus } from 'lucide-react';
import { getImageSize } from '@/lib/utils';

interface Props {
    onValueChange: (value: string) => any;
    setImage: React.Dispatch<any>;
    image: IImage | null;
    publicId?: string;
    type: string;
}

const MediaUploader = ({ publicId }: Props) => {
    const { toast } = useToast();

    function handleUploadSuccess(result: any) {
        toast({
            title: 'Something went wrong while uploading.',
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
                            {/* <CldImage alt='selectedImage' width={getImageSize(type, image, 'width'} /> */}
                        </div>
                    ) : (
                        <div
                            onClick={() => open()}
                            className='flex h-fit min-h-72 w-full cursor-pointer flex-col items-center justify-center rounded-[10px] border border-dashed bg-neutral-100 p-2 shadow-inner gap-4'
                        >
                            <div className='p-2 rounded-[10px] bg-white shadow'>
                                <Plus className='text-purple-500 size-10' />
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
