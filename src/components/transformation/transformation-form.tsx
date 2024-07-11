'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  aspectRatioOptions,
  creditFee,
  defaultValues,
  transformationObject,
} from '@/constants';
import { CustomFormField } from '../form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AspectRatioKey, cn, debounce, deepMergeObjects } from '@/lib/utils';
import { useEffect, useState, useTransition } from 'react';
import { IImage } from '@/lib/database/models/image.model';
import MediaUploader from './media-uploader';
import TransformedImage from './transformed-image';
import { updateCredit } from '@/lib/actions/user.actions';
import { getCldImageUrl } from 'next-cloudinary';
import { createImage, updateImage } from '@/lib/actions/image.actions';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Image title is required.',
  }),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const TransformationForm = ({
  action,
  data = null,
  type: tType,
  userId,
  config = null,
}: TransformationFormProps) => {
  const [isTransforming, setIsTransforming] = useState(false);
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  const [transformationConfig, setTransformationConfig] =
    useState<Transformations | null>(config);
  const [image, setImage] = useState<IImage | null>(data);
  const selectedTransformation = transformationObject[tType];

  const [_, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (tType == 'restore' || tType == 'removeBackground') {
      setNewTransformation(selectedTransformation.config);
    }
  }, [image, selectedTransformation.config, tType]);

  const initialValue =
    data && action == 'Update'
      ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId,
      }
      : defaultValues;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValue,
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: FormSchemaType) {
    if (!image) {
      return;
    }

    const transformationUrl = getCldImageUrl({
      width: image?.width,
      height: image?.height,
      src: image?.publicId!,
      ...transformationConfig,
    });

    const imageData = {
      title: values.title,
      width: image.width as number,
      height: image.height as number,
      publicId: image.publicId,
      secureUrl: image.secureUrl,
      transformationType: tType,
      transformationUrl,
      aspectRatio: values.aspectRatio,
      prompt: values.prompt,
      color: values.color,
      config: transformationConfig,
    };

    if (action == 'Add') {
      try {
        const createdImage = await createImage({
          image: imageData,
          path: '/dashboard/my-images',
          userId,
        });

        form.reset();
        setImage(createdImage);
        router.push(`/dashboard/my-images/${createdImage._id}`);
      } catch { }
    }

    if (action == 'Update') {
      try {
        const updatedImage = await updateImage({
          image: { ...imageData, _id: image._id },
          path: `/transformations/${data._id}`,
          userId,
        });
        router.push(`/dashboard/my-images/${updatedImage._id}`);
      } catch { }
    }
  }

  function onSelectChange(value: string, onChange: (value: string) => any) {
    const ratioInfo = aspectRatioOptions[value as AspectRatioKey];

    setImage((prevState: any) => ({
      ...(prevState || {}),
      aspectRatio: ratioInfo.aspectRatio,
      width: ratioInfo.width,
      height: ratioInfo.height,
    }));

    setNewTransformation(selectedTransformation?.config || {});

    return onChange(value);
  }

  function onInputChange(
    value: string,
    onChange: (value: string) => any,
    field: 'prompt' | 'to',
    type: 'recolor' | 'remove'
  ) {
    debounce(() => {
      setNewTransformation((prev) => ({
        ...prev,
        [type]: {
          ...prev?.[type],
          [field]: value,
        },
      }));
    }, 2000)();

    return onChange(value);
  }

  function handleApplyTransformation() {
    setIsTransforming(true);
    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig)
    );

    setNewTransformation(null);

    startTransition(async () => {
      await updateCredit(userId, creditFee);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <CustomFormField
          control={form.control}
          name='title'
          label='Image Title'
          className='w-full'
          render={({ field }) => <Input {...field} />}
        />

        {tType == 'fill' && (
          <CustomFormField
            control={form.control}
            name='aspectRatio'
            label='Aspect Ratio'
            className='w-full'
            render={({ field }) => (
              <Select
                onValueChange={(e) => onSelectChange(e, field.onChange)}
                value={field.value}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select size' />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map((asp) => (
                    <SelectItem value={asp} key={asp}>
                      {aspectRatioOptions[asp as AspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {(tType == 'remove' || tType == 'recolor') && (
          <CustomFormField
            control={form.control}
            name='prompt'
            label={tType == 'remove' ? 'Object to remove' : 'Object to recolor'}
            className='w-full'
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={(e) => {
                  onInputChange(
                    e.target.value,
                    field.onChange,
                    'prompt',
                    tType
                  );
                }}
              />
            )}
          />
        )}

        {tType == 'recolor' && (
          <CustomFormField
            control={form.control}
            name='color'
            label={'Replacement color'}
            className='w-full'
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={(e) => {
                  onInputChange(
                    e.target.value,
                    field.onChange,
                    'to',
                    'recolor'
                  );
                }}
              />
            )}
          />
        )}
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          <CustomFormField
            control={form.control}
            name='publicId'
            className='flex size-full flex-col'
            render={({ field }) => (
              <MediaUploader
                iconColor={selectedTransformation.textColor}
                setImage={setImage}
                onValueChange={field.onChange}
                publicId={field.value}
                image={image}
                type={tType}
              />
            )}
          />
          <TransformedImage
            image={image}
            type={tType}
            isTransforming={isTransforming}
            setIsTransforming={setIsTransforming}
            title={form.getValues().title}
            transformationConfig={transformationConfig}
          />
        </div>
        <div className='flex flex-col gap-5'>
          <Button
            className={cn(
              'w-full rounded-full py-6 hover:bg-opacity-80',
              selectedTransformation.bgColor
            )}
            type='button'
            onClick={() => {
              handleApplyTransformation();
            }}
            disabled={isTransforming || !newTransformation || !image?.secureUrl}
          >
            {isTransforming ? 'Transforming...' : 'Apply Transformation'}
          </Button>
          <Button
            className={cn(
              'w-full rounded-full py-6 hover:bg-opacity-80',
              selectedTransformation.bgColor
            )}
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Save Image'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { TransformationForm };
