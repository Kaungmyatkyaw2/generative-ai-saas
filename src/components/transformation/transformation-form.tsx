'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  aspectRatioOptions,
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
import { useState } from 'react';
import { IImage } from '@/lib/database/models/image.model';
import MediaUploader from './media-uploader';

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
  type,
}: TransformationFormProps) => {
  const [isTransforming, setIsTransforming] = useState(false);
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  const [transformationConfig, setTransformationConfig] =
    useState<Transformations | null>(null);
  const [image, setImage] = useState<IImage | null>(data);
  const selectedTransformation = transformationObject[type];

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

  function onSubmit(values: FormSchemaType) {
    console.log(values);
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
    }, 2000);

    return onChange(value);
  }

  function handleApplyTransformation() {
    setIsTransforming(true);
    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig)
    );

    setNewTransformation(null);
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

        {type == 'fill' && (
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

        {(type == 'remove' || type == 'recolor') && (
          <CustomFormField
            control={form.control}
            name='prompt'
            label={type == 'remove' ? 'Object to remove' : 'Object to recolor'}
            className='w-full'
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={(e) => {
                  onInputChange(e.target.value, field.onChange, 'prompt', type);
                }}
              />
            )}
          />
        )}

        {type == 'recolor' && (
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
                setImage={setImage}
                onValueChange={field.onChange}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
          />
        </div>
        <div className='flex flex-col gap-5'>
          <Button
            className={cn(
              'w-full rounded-full py-6 hover:bg-opacity-80',
              selectedTransformation.bgColor
            )}
            type='button'
            onClick={handleApplyTransformation}
            disabled={isTransforming}
          >
            Apply Transformations
          </Button>
          <Button
            className={cn(
              'w-full rounded-full py-6 hover:bg-opacity-80',
              selectedTransformation.bgColor
            )}
            type='submit'
            disabled={isSubmitting}
          >
            Save Image
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { TransformationForm };
